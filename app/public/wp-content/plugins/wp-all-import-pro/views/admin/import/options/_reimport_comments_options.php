<?php if ( ! $this->isWizard  or ! empty(PMXI_Plugin::$session->deligate) and PMXI_Plugin::$session->deligate == 'wpallexport' or $this->isWizard and "new" != $post['wizard_type']): ?>
<?php
switch ($post_type) {
    case 'comments':
        $custom_type = new stdClass();
        $custom_type->labels = new stdClass();
        $custom_type->labels->name = __('Comments', 'wp_all_import_plugin');
        $custom_type->labels->singular_name = __('Comment', 'wp_all_import_plugin');
        break;
    case 'woo_reviews':
        $custom_type = new stdClass();
        $custom_type->labels = new stdClass();
        $custom_type->labels->name = __('Reviews', 'wp_all_import_plugin');
        $custom_type->labels->singular_name = __('Review', 'wp_all_import_plugin');
        break;
}
?>
<h4><?php _e('When WP All Import finds new or changed data...', 'wp_all_import_plugin'); ?></h4>
<?php else: ?>
<h4><?php _e('If this import is run again and WP All Import finds new or changed data...', 'wp_all_import_plugin'); ?></h4>
<?php endif; ?>
<div class="input">
	<input type="hidden" name="create_new_records" value="0" />
	<input type="checkbox" id="create_new_records" name="create_new_records" value="1" <?php echo $post['create_new_records'] ? 'checked="checked"' : '' ?> />
	<label for="create_new_records"><?php printf(__('Create new %s from records newly present in your file', 'wp_all_import_plugin'), $custom_type->labels->name); ?></label>
	<?php if ( ! empty(PMXI_Plugin::$session->deligate) and PMXI_Plugin::$session->deligate == 'wpallexport' ): ?>
	<a href="#help" class="wpallimport-help" title="<?php printf(__('New %s will only be created when ID column is present and value in ID column is unique.', 'wp_all_import_plugin'), $custom_type->labels->name); ?>" style="top: -1px;">?</a>
	<?php endif; ?>
</div>
<div class="switcher-target-auto_matching">
	<div class="input">
		<input type="hidden" name="is_delete_missing" value="0" />
		<input type="checkbox" id="is_delete_missing" name="is_delete_missing" value="1" <?php echo $post['is_delete_missing'] ? 'checked="checked"': '' ?> class="switcher" <?php if ( "new" != $post['wizard_type']): ?>disabled="disabled"<?php endif; ?>/>
		<label for="is_delete_missing" <?php if ( "new" != $post['wizard_type']): ?>style="color:#ccc;"<?php endif; ?>><?php printf(__('Delete %s that are no longer present in your file', 'wp_all_import_plugin'), $custom_type->labels->name); ?></label>
		<?php if ( "new" != $post['wizard_type']): ?>
		<a href="#help" class="wpallimport-help" title="<?php _e('Records removed from the import file can only be deleted when importing into New Items. This feature cannot be enabled when importing into Existing Items.', 'wp_all_import_plugin') ?>" style="position:relative; top: -1px;">?</a>
		<?php endif; ?>	
	</div>
	<div class="switcher-target-is_delete_missing" style="padding-left:17px;">
		<div class="input">
			<input type="hidden" name="is_keep_imgs" value="0" />
			<input type="checkbox" id="is_keep_imgs" name="is_keep_imgs" value="1" <?php echo $post['is_keep_imgs'] ? 'checked="checked"': '' ?> <?php if ( "new" != $post['wizard_type']): ?>disabled="disabled"<?php endif; ?>/>
			<label for="is_keep_imgs"><?php _e('Do not remove images', 'wp_all_import_plugin') ?></label>			
		</div>
		<div class="input">
			<input type="hidden" name="is_update_missing_cf" value="0" />
			<input type="checkbox" id="is_update_missing_cf" name="is_update_missing_cf" value="1" <?php echo $post['is_update_missing_cf'] ? 'checked="checked"': '' ?> class="switcher" <?php if ( "new" != $post['wizard_type']): ?>disabled="disabled"<?php endif; ?>/>
			<label for="is_update_missing_cf"><?php _e('Instead of deletion, set Term Meta', 'wp_all_import_plugin') ?></label>
			<div class="switcher-target-is_update_missing_cf" style="padding-left:17px;">
				<div class="input">
					<?php _e('Name', 'wp_all_import_plugin') ?>
					<input type="text" name="update_missing_cf_name" value="<?php echo esc_attr($post['update_missing_cf_name']) ?>" />
					<?php _e('Value', 'wp_all_import_plugin') ?>
					<input type="text" name="update_missing_cf_value" value="<?php echo esc_attr($post['update_missing_cf_value']) ?>" />									
				</div>
			</div>
		</div>
	</div>	
</div>	
<div class="input">
	<input type="hidden" id="is_keep_former_posts" name="is_keep_former_posts" value="yes" />				
	<input type="checkbox" id="is_not_keep_former_posts" name="is_keep_former_posts" value="no" <?php echo "yes" != $post['is_keep_former_posts'] ? 'checked="checked"': '' ?> class="switcher" />
	<label for="is_not_keep_former_posts"><?php printf(__('Update existing %s with the data in your file', 'wp_all_import_plugin'), $custom_type->labels->name); ?></label>
	<?php if ( $this->isWizard and "new" == $post['wizard_type'] and empty(PMXI_Plugin::$session->deligate)): ?>
	<a href="#help" class="wpallimport-help" style="position: relative; top: -2px;" title="<?php _e('These options will only be used if you run this import again later. All data is imported the first time you run an import.<br/><br/>Note that WP All Import will only update/remove posts created by this import. If you want to match to posts that already exist on this site, use Existing Items in Step 1.', 'wp_all_import_plugin') ?>">?</a>	
	<?php endif; ?>
	<div class="switcher-target-is_not_keep_former_posts" style="padding-left:17px;">

        <div class="input" style="margin-left: 4px;">
            <input type="hidden" name="is_selective_hashing" value="0" />
            <input type="checkbox" id="is_selective_hashing" name="is_selective_hashing" value="1" <?php echo $post['is_selective_hashing'] ? 'checked="checked"': '' ?> />
            <label for="is_selective_hashing"><?php printf(__('Skip %s if their data in your file has not changed', 'wp_all_import_plugin'), strtolower($custom_type->labels->name)); ?></label>
            <a href="#help" class="wpallimport-help" style="position: relative; top: -2px;" title="<?php _e('When enabled, WP All Import will keep track of every post\'s data as it is imported. When the import is run again, posts will be skipped if their data in the import file has not changed since the last run.<br/><br/>Posts will not be skipped if the import template or settings change, or if you make changes to the custom code in the Function Editor.', 'wp_all_import_plugin') ?>">?</a>
        </div>

		<input type="radio" id="update_all_data" class="switcher" name="update_all_data" value="yes" <?php echo 'no' != $post['update_all_data'] ? 'checked="checked"': '' ?>/>
		<label for="update_all_data"><?php _e('Update all data', 'wp_all_import_plugin' )?></label><br>
		
		<input type="radio" id="update_choosen_data" class="switcher" name="update_all_data" value="no" <?php echo 'no' == $post['update_all_data'] ? 'checked="checked"': '' ?>/>
		<label for="update_choosen_data"><?php _e('Choose which data to update', 'wp_all_import_plugin' )?></label><br>
		<div class="switcher-target-update_choosen_data"  style="padding-left:27px;">
			<div class="input">
				<h4 class="wpallimport-trigger-options wpallimport-select-all" rel="<?php _e("Unselect All", "wp_all_import_plugin"); ?>"><?php _e("Select All", "wp_all_import_plugin"); ?></h4>
			</div>
            <div class="input">
                <input type="hidden" name="is_update_comment_post_id" value="0" />
                <input type="checkbox" id="is_update_comment_post_id" name="is_update_comment_post_id" value="1" <?php echo $post['is_update_comment_post_id'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_post_id"><?php _e('Parent Post', 'wp_all_import_plugin') ?></label>
            </div>
            <?php if ($post_type == 'woo_reviews'): ?>
            <div class="input">
                <input type="hidden" name="is_update_comment_rating" value="0" />
                <input type="checkbox" id="is_update_comment_rating" name="is_update_comment_rating" value="1" <?php echo $post['is_update_comment_rating'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_rating"><?php printf(__('%s Rating', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
            </div>
            <?php endif; ?>
			<div class="input">
				<input type="hidden" name="is_update_comment_author" value="0" />
				<input type="checkbox" id="is_update_comment_author" name="is_update_comment_author" value="1" <?php echo $post['is_update_comment_author'] ? 'checked="checked"': '' ?> />
				<label for="is_update_comment_author"><?php printf(__('%s Author', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
			</div>
			<div class="input">
				<input type="hidden" name="is_update_comment_author_email" value="0" />
				<input type="checkbox" id="is_update_comment_author_email" name="is_update_comment_author_email" value="1" <?php echo $post['is_update_comment_author_email'] ? 'checked="checked"': '' ?> />
				<label for="is_update_comment_author_email"><?php printf(__('%s Author Email', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
			</div>
            <div class="input">
                <input type="hidden" name="is_update_comment_author_url" value="0" />
                <input type="checkbox" id="is_update_comment_author_url" name="is_update_comment_author_url" value="1" <?php echo $post['is_update_comment_author_url'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_author_url"><?php printf(__('%s URL', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
            </div>
            <div class="input">
                <input type="hidden" name="is_update_comment_author_IP" value="0" />
                <input type="checkbox" id="is_update_comment_author_IP" name="is_update_comment_author_IP" value="1" <?php echo $post['is_update_comment_author_IP'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_author_IP"><?php printf(__('%s IP', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
            </div>
            <div class="input">
                <input type="hidden" name="is_update_dates" value="0" />
                <input type="checkbox" id="is_update_dates" name="is_update_dates" value="1" <?php echo $post['is_update_dates'] ? 'checked="checked"': '' ?> />
                <label for="is_update_dates"><?php _e('Date', 'wp_all_import_plugin') ?></label>
            </div>
			<div class="input">
				<input type="hidden" name="is_update_content" value="0" />
				<input type="checkbox" id="is_update_content" name="is_update_content" value="1" <?php echo $post['is_update_content'] ? 'checked="checked"': '' ?> />
				<label for="is_update_content"><?php _e('Content', 'wp_all_import_plugin') ?></label>
			</div>
            <div class="input">
                <input type="hidden" name="is_update_comment_karma" value="0" />
                <input type="checkbox" id="is_update_comment_karma" name="is_update_comment_karma" value="1" <?php echo $post['is_update_comment_karma'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_karma"><?php _e('Karma', 'wp_all_import_plugin') ?></label>
            </div>
            <div class="input">
                <input type="hidden" name="is_update_comment_approved" value="0" />
                <input type="checkbox" id="is_update_comment_approved" name="is_update_comment_approved" value="1" <?php echo $post['is_update_comment_approved'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_approved"><?php _e('Approved', 'wp_all_import_plugin') ?></label>
            </div>
            <?php if ($post_type == 'woo_reviews'): ?>
                <div class="input">
                    <input type="hidden" name="is_update_comment_verified" value="0" />
                    <input type="checkbox" id="is_update_comment_verified" name="is_update_comment_verified" value="1" <?php echo $post['is_update_comment_verified'] ? 'checked="checked"': '' ?> />
                    <label for="is_update_comment_verified"><?php _e('Verified', 'wp_all_import_plugin'); ?></label>
                </div>
            <?php endif; ?>
            <div class="input">
                <input type="hidden" name="is_update_comment_agent" value="0" />
                <input type="checkbox" id="is_update_comment_agent" name="is_update_comment_agent" value="1" <?php echo $post['is_update_comment_agent'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_agent"><?php _e('Agent', 'wp_all_import_plugin') ?></label>
            </div>
            <div class="input">
                <input type="hidden" name="is_update_comment_type" value="0" />
                <input type="checkbox" id="is_update_comment_type" name="is_update_comment_type" value="1" <?php echo $post['is_update_comment_type'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_type"><?php _e('Type', 'wp_all_import_plugin') ?></label>
            </div>
			<div class="input">
				<input type="hidden" name="is_update_parent" value="0" />
				<input type="checkbox" id="is_update_parent" name="is_update_parent" value="1" <?php echo $post['is_update_parent'] ? 'checked="checked"': '' ?> />
				<label for="is_update_parent"><?php printf(__('Parent %s', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
			</div>
            <div class="input">
                <input type="hidden" name="is_update_comment_user_id" value="0" />
                <input type="checkbox" id="is_update_comment_user_id" name="is_update_comment_user_id" value="1" <?php echo $post['is_update_comment_user_id'] ? 'checked="checked"': '' ?> />
                <label for="is_update_comment_user_id"><?php _e('Author User ID', 'wp_all_import_plugin') ?></label>
            </div>
			
			<?php
				// add-ons re-import options
				do_action('pmxi_reimport', $post_type, $post);
			?>						

			<div class="input">			
				<input type="hidden" name="custom_fields_list" value="0" />			
				<input type="hidden" name="is_update_custom_fields" value="0" />
				<input type="checkbox" id="is_update_custom_fields" name="is_update_custom_fields" value="1" <?php echo $post['is_update_custom_fields'] ? 'checked="checked"': '' ?>  class="switcher"/>
				<label for="is_update_custom_fields"><?php printf(__('%s Meta', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
				<!--a href="#help" class="wpallimport-help" title="<?php _e('If Keep Comment Meta box is checked, it will keep all Comment Meta, and add any new Comment Meta specified in Comment Meta section, as long as they do not overwrite existing fields. If \'Only keep this Comment Meta\' is specified, it will only keep the specified fields.', 'wp_all_import_plugin') ?>">?</a-->
				<div class="switcher-target-is_update_custom_fields" style="padding-left:17px;">
					<div class="input">
						<input type="radio" id="update_custom_fields_logic_full_update" name="update_custom_fields_logic" value="full_update" <?php echo ( "full_update" == $post['update_custom_fields_logic'] ) ? 'checked="checked"': '' ?> class="switcher"/>
						<label for="update_custom_fields_logic_full_update"><?php printf(__('Update all %s Meta', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
					</div>					
					<div class="input">
						<input type="radio" id="update_custom_fields_logic_only" name="update_custom_fields_logic" value="only" <?php echo ( "only" == $post['update_custom_fields_logic'] ) ? 'checked="checked"': '' ?> class="switcher"/>
						<label for="update_custom_fields_logic_only"><?php printf(__('Update only these %s Meta, leave the rest alone', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
						<div class="switcher-target-update_custom_fields_logic_only pmxi_choosen" style="padding-left:17px;">								
							<span class="hidden choosen_values"><?php if (!empty($existing_meta_keys)) echo esc_html(implode(',', $existing_meta_keys));?></span>
							<input class="choosen_input" value="<?php if (!empty($post['custom_fields_list']) and "only" == $post['update_custom_fields_logic']) echo esc_html(implode(',', $post['custom_fields_list'])); ?>" type="hidden" name="custom_fields_only_list"/>										
						</div>						
					</div>
					<div class="input">
						<input type="radio" id="update_custom_fields_logic_all_except" name="update_custom_fields_logic" value="all_except" <?php echo ( "all_except" == $post['update_custom_fields_logic'] ) ? 'checked="checked"': '' ?> class="switcher"/>
						<label for="update_custom_fields_logic_all_except"><?php printf(__('Leave these fields alone, update all other %s Meta', 'wp_all_import_plugin'), $custom_type->labels->singular_name); ?></label>
						<div class="switcher-target-update_custom_fields_logic_all_except pmxi_choosen" style="padding-left:17px;">						
							<span class="hidden choosen_values"><?php if (!empty($existing_meta_keys)) echo esc_html(implode(',', $existing_meta_keys));?></span>
							<input class="choosen_input" value="<?php if (!empty($post['custom_fields_list']) and "all_except" == $post['update_custom_fields_logic']) echo esc_html(implode(',', $post['custom_fields_list'])); ?>" type="hidden" name="custom_fields_except_list"/>																				
						</div>						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	
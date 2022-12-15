<?php


/**
 * All custom endpoints
 */

//set timezone



include 'blog/getBlogPosts.php';
include 'blog/getPostById.php';

//taxonomy
    //categories
include 'taxonomy/categories/getAllCategories.php';
include 'taxonomy/categories/getAllFromCategory.php';
    //sectors
include 'taxonomy/sectors/getAllSectors.php';

//jobs
include 'jobs/applyForJob.php';
include 'jobs/createJob.php';
include 'jobs/getAllJobs.php';
include 'jobs/getApplications.php';
include 'jobs/getJobById.php';
include 'jobs/getJobsFromCompany.php';
include 'jobs/getJobsOnSearch.php';
include 'jobs/renewJob.php';
include 'jobs/closeJob.php';
include 'jobs/EditJob.php';


//alerts
include 'alerts/getAlertsFromUser.php';
include 'alerts/sectorAlerts.php';
include 'alerts/deleteAlert.php';
include 'alerts/updateAlert.php';

//auth
include 'auth/registerCandidate.php';
include 'auth/registerCompanyAdmin.php';
include 'auth/registerCompanyUser.php';
include 'user/getUserData.php';


//companies
include 'companies/getAllCompanies.php';
include 'companies/getCompanyById.php';
include 'companies/getCompanyByName.php';
include 'companies/getCompanyBySlug.php';
include 'companies/updateCompany.php';


//cv
include 'cv/setCvUrl.php';
include 'cv/updateCv.php';
include 'cv/uploadCv.php';

//user
include 'user/getCv.php';
include 'user/updateUser.php';
include 'user/getUserId.php';
include 'user/getUserDetails.php';

//user roles
include 'userRoles/companyAdmin.php';
include 'userRoles/getUserById.php';
include 'userRoles/getUserCompany.php';
include 'userRoles/getUserRole.php';


//applications
include 'applications/setStatus.php';
include 'applications/getAllApplicationsJobseeker.php';

//packages
include 'packages/buyPackage.php';
include 'packages/getMyPackages.php';


// 
include 'blog/getAmountOfPosts.php';
include 'blog/blogSearch.php';

//applications
include 'applications/getAllApplications.php';
include 'applications/getApplicationForAJob.php';

//pages
include 'pages/home.php';
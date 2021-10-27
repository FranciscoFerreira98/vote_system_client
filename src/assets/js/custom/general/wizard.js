"use strict";var KTWizardPage=function(){var t,e,o,r,i=[];return{init:function(){t=document.querySelector("#kt_stepper"),e=document.querySelector("#kt_stepper_form"),o=document.querySelector('[data-kt-stepper-action="submit"]'),(r=new KTStepper(t)).on("kt.stepper.next",(function(t){console.log("stepper.next");var e=i[t.getCurrentStepIndex()-1];e?e.validate().then((function(e){console.log("validated!"),"Valid"==e?(t.goNext(),KTUtil.scrollTop()):Swal.fire({text:"Sorry, looks like there are some errors detected, please try again.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn fw-bold btn-light"}}).then((function(){KTUtil.scrollTop()}))})):(t.goNext(),KTUtil.scrollTop())})),r.on("kt.stepper.previous",(function(t){console.log("stepper.previous"),t.goPrevious(),KTUtil.scrollTop()})),o.addEventListener("click",(function(t){t.preventDefault(),Swal.fire({text:"All is good! Please confirm the form submission.",icon:"success",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, submit!",cancelButtonText:"No, cancel",customClass:{confirmButton:"btn fw-bold btn-primary",cancelButton:"btn fw-bold btn-active-light-primary"}}).then((function(t){t.value?e.submit():"cancel"===t.dismiss&&Swal.fire({text:"Your form has not been submitted!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn fw-bold btn-primary"}})}))})),i.push(FormValidation.formValidation(e,{fields:{comnpanyname:{validators:{notEmpty:{message:"Company name is required"}}},yourname:{validators:{notEmpty:{message:"Your name is required"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap5({eleValidClass:"",rowSelector:".fv-row"})}})),i.push(FormValidation.formValidation(e,{fields:{address1:{validators:{notEmpty:{message:"Address is required"}}},address2:{validators:{notEmpty:{message:"Address is required"}}},postcode:{validators:{notEmpty:{message:"Postcode is required"}}},city:{validators:{notEmpty:{message:"City is required"}}},state:{validators:{notEmpty:{message:"State is required"}}},country:{validators:{notEmpty:{message:"Country is required"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap5({eleValidClass:"",rowSelector:".fv-row"})}}))}}}();KTUtil.onDOMContentLoaded((function(){KTWizardPage.init()}));
import Swal from "sweetalert2";

export const swalCall= (swalTitle)=>{

    Swal.fire({
        title:swalTitle,
        showConfirmButton:true,
        confirmButtonText:"OK",
        showCancelButton: true ,
        cancelButtonText: "Cancel",
        icon: isRegistered? "info":"success" 
    }).then(result=>{
        // if (!isRegistered)
        // {
        //     setIsSignedUp(true)
        // }else{         
        //     if (result.isDismissed)
        //         setIsSignedUp(true);                
        // }
    })
}
import { Alert } from "@mui/material";

export function CustomAlert ({message = "", severity="", state=false, isSuccess=false, isError=false, isWarning=false }) {

    if (severity === ""){
        if (isSuccess)
        severity = "success";

        else if (isError)
            severity = "error";

        else if (isWarning)
            severity = "warning"

        else
            severity = "info"
    }    

    return  <Alert 
                style={{zIndex: "1", position: 'fixed', margin: "0px auto", justifyContent: "center", width: "50%", top: "3%", right:  state ? "1%" : "-100%", transition: "0.5s" }} 
                severity={severity}
                >
                {message}
            </Alert>

}
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noSpacesValidator(): ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null =>{
        if(control.value && control.value.trim().length === 0){
            return { 'noSpaces': true}
        }
        return null
    }
}

export function passwordValidator():ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{
        const passwordMatch = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
        if(!passwordMatch.test(control.value)){
            return {'passwordError': true}
        }
        return null
    }
}
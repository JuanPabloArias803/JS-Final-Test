export function emailValidator(email){
    if(email.includes("@")&&email.includes(".")){
        return true;
    }else{
        return false;
    }
}
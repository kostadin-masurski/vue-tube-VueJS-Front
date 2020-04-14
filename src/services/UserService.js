import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

export const UserService = {
    login(user) {
        let loginFormData = new FormData;
        loginFormData.append("username", user.username);
        loginFormData.append("password", user.password);
        return Vue.axios.post('http://localhost:8080/api/login', loginFormData);
    },
    
    register(user) {
        let registerFormData = new FormData;
        registerFormData.append("username", user.username);
        registerFormData.append("email", user.email);	
        registerFormData.append("password", user.password);
        registerFormData.append("confirmPassword", user.confirmPassword);
        console.log(user);
        return Vue.axios.post('http://localhost:8080/api/register', registerFormData);
    },
}
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

export const UserService = {
    login(user) {
        return Vue.axios.post('http://localhost:8080/api/login', user);
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
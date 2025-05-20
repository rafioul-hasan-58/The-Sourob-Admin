import LoginForm from '@/components/modules/login/LoginForm';
import loginbg from '../../assets/bg-login.jpg'
const Login = () => {
    return (
        <div style={{ backgroundImage: `url(${loginbg.src})` }} 
        className="h-screen  absolute inset-0 bg-cover bg-center flex justify-center items-center">
            <div className="">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
import { useHistory } from 'react-router-dom';

const IsNotAuth = (WrappedComponent) => {

    const Wrapper = (props) => {
        const token = localStorage.getItem('token');
        const history = useHistory();

        if (token) {
            history.push('/');
            return null;
        }

        return (
            <WrappedComponent {...props} />
        )
    }

    return Wrapper;
}

export default IsNotAuth;
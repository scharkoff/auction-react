import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { IResponse } from 'utils/types';

const handleInternalOrServerError = (response: IResponse, setAlertOptions: TSetAlertOptions) => {
    if (response?.payload) {
        return setAlertOptions(true, 'success', response?.payload?.message);
    }

    if (response?.error) {
        if (response.error.message.includes('401')) {
            return setAlertOptions(true, 'error', 'Неправильный логин или пароль');
        }
    }

    return setAlertOptions(
        true,
        'error',
        'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз',
    );
};

export default handleInternalOrServerError;

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

        if (response.error.message.includes('400')) {
            return setAlertOptions(true, 'error', 'Неправильный формат запроса');
        }

        if (response.error.message.includes('404')) {
            return setAlertOptions(true, 'error', 'Запрашиваемый объект не найден (404)');
        }

        if (response.error.message.includes('403')) {
            return setAlertOptions(
                true,
                'error',
                'Недостаточно прав для выполнения операции (401)',
            );
        }
    }

    return setAlertOptions(
        true,
        'error',
        'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз',
    );
};

export default handleInternalOrServerError;

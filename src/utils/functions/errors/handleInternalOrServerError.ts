import { TSetAlertOptions } from 'hooks/useAlertMessage';
import { IRejectedResponse, IResponse } from 'utils/types';

const handleInternalOrServerError = (
    response: IResponse | IRejectedResponse,
    setAlertOptions: TSetAlertOptions,
) => {
    if ('error' in response) {
        if (response.payload && response.payload.status === 400) {
            if ('non_field_errors' in response.payload.data) {
                return setAlertOptions(true, 'error', response.payload.data.non_field_errors[0]);
            }

            if ('username' in response.payload.data) {
                return setAlertOptions(true, 'error', 'Данный логин уже используется');
            }

            if ('email' in response.payload.data) {
                return setAlertOptions(true, 'error', 'Данная почта уже используется');
            }

            return setAlertOptions(true, 'error', 'Неправильный формат запроса');
        }

        if (response.payload && response.payload.status === 401) {
            return setAlertOptions(
                true,
                'error',
                'Ошибка авторизации (неверные учетные данные или недействительная сессия)',
            );
        }

        if (response.payload && response.payload.status === 404) {
            return setAlertOptions(true, 'error', 'Запрашиваемый объект не найден (404)');
        }

        if (response.payload && response.payload.status === 500) {
            return setAlertOptions(
                true,
                'error',
                'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз',
            );
        }
    } else {
        return setAlertOptions(true, 'success', response.payload.message);
    }

    return setAlertOptions(
        true,
        'error',
        'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз',
    );
};

export default handleInternalOrServerError;

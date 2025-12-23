import { URL } from '../data/constants.js';

const getData = async () => {
  try {
    const response = await fetch(`${URL}/data`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Не удалось загрузить данные: ${error.message}`);
  }
};

const sendData = async (formData) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Не удалось отправить данные: ${error.message}`);
  }
};

export { getData, sendData };

# **Brawl Picker**


[![JavaScript](https://img.shields.io/badge/-Javascript-090909?style=for-the-badge&logo=javascript&logoColor=#3178C6)](https://github.com/Timhok0217)
[![React](https://img.shields.io/badge/-React-090909?style=for-the-badge&logo=react&logoColor=#3178C6)](https://github.com/Timhok0217)
[![Axios](https://img.shields.io/badge/-Axios-090909?style=for-the-badge&logo=axios&logoColor=671DDF)](https://github.com/Timhok0217)
[![Tailwind](https://img.shields.io/badge/-Tailwind-090909?style=for-the-badge&logo=tailwindcss&logoColor=#28A8E8)](https://github.com/Timhok0217)
[![Swiper](https://img.shields.io/badge/-Swiper-090909?style=for-the-badge&logo=swiper&logoColor=0080FF)](https://github.com/Timhok0217)
[![Python](https://img.shields.io/badge/-Python-090909?style=for-the-badge&logo=python&logoColor=#28A8E8)](https://github.com/Timhok0217)
[![Django](https://img.shields.io/badge/-Django-090909?style=for-the-badge&logo=django&logoColor=0C4B33)](https://github.com/Timhok0217)



**Brawl Picker** - веб-приложение для отслеживания статистики игроков в популярной игре Brawl Stars. 

Если Вы знаете **тэг** игрока - специальный идентификатор в игре, то можно ввести его в соответсвующее на заглавной странице и посмотреть всю статистику:
* открытые персонажи,
* недавние бои,
* общее число трофеев и тд. 

**Пример тэга**:
```
#20GGYV0LY
```
## **Установка**
Чтобы запустить проект локально на Вашем устройстве, необходимо предварительно скачать все файлы из данного репозитория.

Также Вам потребуется установить некоторые официальные библиотеки, которые используются в проекте:
* Вам понадобятся [Node.js](https://nodejs.org/ru/) не ниже версии 14.0.0 и npm не ниже версии 5.6 на вашем компьютере
* Также следуюет установить библиотеки Axios, Swiper, а также [Tailwind](https://tailwindcss.ru/docs/installation/) для CSS - установите все зависимости с помощью:
  ```
  npm install
  ```
  

### **Backend**

1. Перейдите в директорию ```\back-brawl-picker\BrawlPicker```.
   
2. Чтобы запустить сервер, Вам потребуется зарегистрироваться на сайте [Brawl Stars API](https://developer.brawlstars.com/) и получить специальный токен, согласно вашему IP адресу. Как только вы сгенерируете токен, его нужно будет ввести в конфигурационный файл проекта: ```back-brawl-picker/BrawlPicker/mainapp/config.py``` — вместо исходного ```API KEY``` вставьте Ваш токен. Данный пункт можно выполнять после 6.
   
3. Запустите виртуальную среду с помощью команды ```myvenv\Scripts\activate```. Если данная команда выдает ошибку, то попробуйте сначала перейти в директорию Scripts: ```cd myvenv\Scripts``` и оттуда ввести ```activate```.
    ```
    myvenv\Scripts\activate
    ```
    илиa
    ```
    cd myvenv\Scripts
    activate
    ```

4. Как только вы запустите виртуальную среду, необходимо находиться в директорию ```\back-brawl-picker\BrawlPicker```. Оттуда нужно запустить сервер следующей командой: ```python manage.py runserver```
    ```
    cd ...\back-brawl-picker\BrawlPicker
    python manage.py runserver
    ```

   
5. Далее можно переходить по следующему адресу [http://127.0.0.1:8000/](http://127.0.0.1:8000/) в вашем браузере.
   
6. Сервер работает, а если вы хотите просматривать GET и POST запросы, то лучше перейти в [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api) или же [http://127.0.0.1:8000/ip](http://127.0.0.1:8000/ip), чтобы посмотреть Ваш IP для получения токена из пункта 2.

**На данном этапе мы запустили сервер проекта, далее запустим клиентскую часть**

### **Frontend**

1. Перейдите в следующую директорию: ```\bralwstars_picker\front-brawl-picker```
2. Пропишите команду ```npm start``` для запуска клиентской части

    ```
    npm start
    ```

3. Далее у Вас автоматически откроется страница с сайтом в браузере.

**Теперь сайт готов к использованию!**


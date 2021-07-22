/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const renderMovies = (moviesList) => {

    moviesList.innerHTML = "";

    movieDB.movies.sort();

    movieDB.movies.forEach((element, i) => {

        moviesList.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${element}
                <div class="delete"></div>
            </li>
       `
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {

            movieDB.movies.splice(i, 1);
            renderMovies(moviesList);
        });

    });

}

function blockAdv() {
    const adv = document.querySelectorAll('.promo__adv img');
    adv.forEach((elem) => {
        elem.remove();
    });
}

function getGenre(title) {
    const gener = document.querySelector('.promo__genre');
    gener.textContent = title;
}

function changeBg(file) {
    const bg = document.querySelector('.promo__bg');
    bg.style.background = `url('../img/${file}')`;
}

document.addEventListener('DOMContentLoaded', () => {

    const moviesList = document.querySelector('.promo__interactive-list');

    renderMovies(moviesList);
    blockAdv();
    getGenre('драма');
    changeBg('bg.jpg');

    // part2

    const form = document.querySelector('.add');
    const input = form.querySelector('.adding__input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let title = input.value.trim();
        if (title) {
            if (title.length > 21) {
                title = title.slice(0, 21);
                title += '...';
            }
            movieDB.movies.push(title);
            renderMovies(moviesList);

            const favorite = form.querySelector('[type="checkbox"]');
            if (favorite.checked) console.log('Добавляем любимый фильм');

            e.target.reset();
        }
    });
});
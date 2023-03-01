# Houter
Лэндинг о недвижимости.     
Субъективная сложность - средняя.

## Просмотр:
lalivirtei.github.io

## Установка
1. `npm i` - Установка пакетов
2. `gulp`  Запуск сборки

Собирает папку build и стартует localhost:3000.

## Трудности

- Фон между секциями
  - `проблема` он был сделан градиентом по всей длине макета. background не может быть больше родителя, а ставить <img> для фона - не семантично.
  - `решение` после долгих мучений принял решение собрать градиенты в один .svg и задать фон всему body. Не очень, потому что на мобильном это будет совсем не то. Можно было задать внутренний отступы для секций, где этот фон выше их начала, добавить отрицательные внешние отступы и позиционировать фон, но я бы обсудил это с дизайнером макета - разговор бы занял 5 минут, но возможно это помогло бы нам обоим. Мне точно - экономия времени ~пол-часа и более гармоничный код в стилях.
- Youtube видео с кастомной кнопкой
  - `проблема` "ленивая загрузка" c автовоспроизведенем после клика на подменном блоке - не работает на мобильном (даже если у iframe &mute=1)
  - `решение` на мобильном сделал стандартный iframe, но он не соответствует макету. Пришлось применить плагин fancybox.
- Фон секции с подпиской
  - `проблема` Не понял, почему в Figma секция "Subscribe" была сделана не единым изображением.
  - `решение` объединил группу в дизайне и экспортировал как одну картинку. Хотелось бы обратиться к более опытным товарищам, или к дизайнеру.
- Сложные градиенты
  - `проблема` хочется делать их в стилях, но не вышло экспортировать. Возможно проблема скорее в моих хотелках.
  - `решение` достал .svg файлом

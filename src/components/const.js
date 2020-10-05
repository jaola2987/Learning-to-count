export const START_SCREEN = {
    title: "Home",
    subtitle: "Учусь считать", 
    description: "Настройте вашу тренировку:",
    list: [
        {id: 1, icon: "plus", text: "Сложение", value: "plus"},
        {id: 2, icon: "minus", text: "Вычитание", value: "minus"},
        {id: 3, icon: "window-close", text: "Умножение", value: "multiplication"},
        {id: 4, icon: "division", text: "Деление", value: "division"}
    ],
    path: "/",
    image: require('../../assets/home.png'),
}

export const KEPT_SCREEN = {
    title: "Сохраненные",
    path: "/kept",
    image: require('../../assets/kept.png'),
    empty: "У вас нет сохраненных тренировок",
}

export const STATISTICS_SCREEN = {
    title: "Отчет",
    path: "/statistics",
    image: require('../../assets/stat.png'),
    empty: "У вас нет сохраненных отчетов",
}

export const RESOLVE_SCREEN = {
    title: "Реши",
    path: "/resolve",
}

export const RESULT_SCREEN = {
    title: "Результат",
    path: "/result",
}
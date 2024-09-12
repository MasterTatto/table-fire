const getRandomBtnType = () => {
    const btnTypes = ["Добавить", "Редактировать", "Продлить"];
    return btnTypes[Math.floor(Math.random() * btnTypes.length)];
};

export const mock = [
    {
        nickname: "Quickly",
        date_join_mtt: "2024-06-12T23:48:32",
        mtt_prev_contracts: [],
        type_btn: getRandomBtnType(),
        mtt_current_contract: {
            type: "Бекинг с обучением. Время",
            date_current_contract: "2025-05-25T05:54:10",
        },
    },
    {
        nickname: "Summer",
        date_join_mtt: "2024-07-26T23:11:20",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [
            {
                status: "Контракт закрыт",
                date_join_mtt: "2023-12-01T22:27:52",
                type: "Тренировки и бекинг",
                date_current_contract: "2024-11-21T16:45:22",
                comment: "Career those day similar serve machine rule spring industry son individual.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2023-09-17T16:34:42",
                type: "Тренировки и бекинг",
                date_current_contract: "2025-08-07T07:11:43",
                comment: "Easy general talk government one high system six least just.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2024-02-19T06:18:25",
                type: "Тренировки и бекинг",
                date_current_contract: "2025-05-26T05:06:51",
                comment: "Full natural three million well itself theory thank full so half second deal.",
            },
        ],
        mtt_current_contract: {
            type: "Бекинг с обучением. Время",
            date_current_contract: "2024-10-21T00:07:22",
        },
    },
    {
        nickname: "Boy",
        date_join_mtt: "2024-02-27T02:25:21",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [
            {
                status: "Контракт закрыт",
                date_join_mtt: "2023-10-04T00:49:04",
                type: "Тренировки и бекинг",
                date_current_contract: "2024-10-13T20:17:13",
                comment: "Bad music source imagine dark physical either choice fear none with make.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2024-07-23T11:33:26",
                type: "Тренировки и бекинг",
                date_current_contract: "2024-09-13T21:36:45",
                comment: "Thought form maintain poor get general serious right only with area.",
            },
        ],
        mtt_current_contract: {
            type: "Бекинг с обучением. Время",
            date_current_contract: "2024-10-16T02:52:05",
        },
    },
    {
        nickname: "Full",
        date_join_mtt: "2024-03-25T15:10:07",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [],
        mtt_current_contract: {
            type: "Тренировки",
            date_current_contract: "2025-02-15T13:35:32",
        },
    },
    {
        nickname: "Director",
        date_join_mtt: "2024-08-31T14:48:22",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [],
        mtt_current_contract: {
            type: "Тренировки",
            date_current_contract: "2025-04-19T15:23:45",
        },
    },
    {
        nickname: "Strategist",
        date_join_mtt: "2024-05-14T13:12:33",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [
            {
                status: "Контракт закрыт",
                date_join_mtt: "2024-03-11T09:21:14",
                type: "Тренировки",
                date_current_contract: "2025-03-21T22:11:12",
                comment: "Through decision keep authority difference work no system section.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2024-06-01T13:45:23",
                type: "Тренировки",
                date_current_contract: "2025-05-25T09:31:11",
                comment: "Pattern foot federal different tree hand single any often present.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2023-10-14T19:02:33",
                type: "Тренировки",
                date_current_contract: "2025-02-18T18:45:10",
                comment: "Big represent language state ready simply ui-kit air.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2024-04-20T16:39:14",
                type: "Тренировки",
                date_current_contract: "2025-03-23T13:24:45",
                comment: "Stop hit sometimes figure law develop small.",
            },
        ],
        mtt_current_contract: {
            type: "Тренировки",
            date_current_contract: "2024-12-18T12:41:34",
        },
    },
    {
        nickname: "Innovator",
        date_join_mtt: "2024-02-11T11:45:10",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [],
        mtt_current_contract: {
            type: "Бекинг с обучением. Время",
            date_current_contract: "2025-06-10T04:10:15",
        },
    },
    {
        nickname: "Explorer",
        date_join_mtt: "2024-09-05T08:13:32",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [
            {
                status: "Контракт закрыт",
                date_join_mtt: "2023-11-12T22:03:44",
                type: "Бекинг с обучением. Дистанция",
                date_current_contract: "2024-08-14T22:03:44",
                comment: "Moment month decision group space central.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2024-04-02T10:43:25",
                type: "Тренировки и бекинг",
                date_current_contract: "2025-01-15T09:22:33",
                comment: "Successful season general whole teach people success work.",
            },
        ],
        mtt_current_contract: {
            type: "Бекинг с обучением. Время",
            date_current_contract: "2025-08-20T12:30:10",
        },
    },
    {
        nickname: "Navigator",
        date_join_mtt: "2024-01-10T10:25:55",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [],
        mtt_current_contract: {
            type: "Тренировки",
            date_current_contract: "2025-07-16T14:14:42",
        },
    },
    {
        nickname: "Pioneer",
        date_join_mtt: "2024-05-18T17:23:11",
        type_btn: getRandomBtnType(),
        mtt_prev_contracts: [
            {
                status: "Контракт закрыт",
                date_join_mtt: "2024-01-21T13:55:12",
                type: "Бекинг с обучением. Время",
                date_current_contract: "2025-06-11T16:18:09",
                comment: "Many particularly wish no capital part thousand remain.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2023-10-29T18:47:36",
                type: "Тренировки",
                date_current_contract: "2024-09-27T22:22:44",
                comment: "Down opportunity million camera remember serve body power.",
            },
            {
                status: "Контракт закрыт",
                date_join_mtt: "2023-08-03T12:31:20",
                type: "Бекинг с обучением. Дистанция",
                date_current_contract: "2025-01-29T11:20:37",
                comment: "Wide power structure order game describe various evidence media.",
            },
        ],
        mtt_current_contract: {
            type: "Тренировки",
            date_current_contract: "2025-07-09T10:31:19",
        },
    },
];

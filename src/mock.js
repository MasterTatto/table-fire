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

export const mock_data = {
    "players": [
        {
            "player_id": "1045241884743839785",
            "nickname": "Zlobnik",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "535160130975825930",
            "nickname": "Kaiman!o_o!",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "872658291975684096",
            "nickname": "justin_nah",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "920354544108601356",
            "nickname": "V. Fisherman",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "290504772153376768",
            "nickname": "DashinRab",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "301690978623029248",
            "nickname": "BaTTLe*ERRE",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "708985712623616010",
            "nickname": "Pashademin",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "873088303413465108",
            "nickname": "TARAKAH666",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "920700390503251999",
            "nickname": "c4actie_ectb",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "445209420461506571",
            "nickname": "ceji9i",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "387234460804055040",
            "nickname": "vadim_vgks",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "723141494642573313",
            "nickname": "RUSSIA2012",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "967079393941921803",
            "nickname": "asdAk1",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "535473215082856458",
            "nickname": "sarovchik",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "749268714628579458",
            "nickname": "latinos914",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "816941473487781909",
            "nickname": "Iwantbearich",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "629310367104892948",
            "nickname": "Lppase9160",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "854715130586726450",
            "nickname": "tcovik",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "834415791087812690",
            "nickname": "mazy013",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "680383938585427978",
            "nickname": "kirill123355",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "459743929680658462",
            "nickname": "aaaaapchi",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "715499028657471498",
            "nickname": "aammpp",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "905025753542971402",
            "nickname": "Bogdan1654",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "557645063333871626",
            "nickname": "Bill41k",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "760185577680928808",
            "nickname": "niko19860609",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "630377635716792320",
            "nickname": "DMerzhuk",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "443373186864644097",
            "nickname": "damazan",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "583935266457387019",
            "nickname": "DikeY_RD",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "679950768496967680",
            "nickname": "xxxEvgen",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "326488845342212096",
            "nickname": "9_znay_karti",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "422688056081121280",
            "nickname": "Arkip",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "515213729038598144",
            "nickname": "Cep9111",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "557234686582063104",
            "nickname": "Artemio09",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "415599370919084036",
            "nickname": "beanpaul",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "449180098512289793",
            "nickname": "S@MURA1",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "960931776908374066",
            "nickname": "sacha_cas",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "313156850243600407",
            "nickname": "tim_pro_405!",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "355034627502505984",
            "nickname": "Johni12367",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "523008778577248267",
            "nickname": "VolanPoker",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "388385489784143873",
            "nickname": "Yanxi",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "316208368610050049",
            "nickname": "darrling3121",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "253945800692858880",
            "nickname": "nhsdoto",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "396389041454710796",
            "nickname": "Kelly2AA",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "314033466733756417",
            "nickname": "Legachai",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "381601727096422403",
            "nickname": "tekdetected",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "999885160407371816",
            "nickname": "Arsentiy92",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "358020168695414804",
            "nickname": "khalisi",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "470921389688487947",
            "nickname": "Miscra",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "261766419815989248",
            "nickname": "WitherV",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "724969506329329745",
            "nickname": "Vladislav k7",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "713431544303321219",
            "nickname": "Aragon",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "730299103853936701",
            "nickname": "karpychev888",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "766542392325046302",
            "nickname": "ledenis87",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "729771223810179274",
            "nickname": "MahdiKao",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "700254680424382466",
            "nickname": "iglukin",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "280760162963161088",
            "nickname": "Grkardinal93",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "377846975866863616",
            "nickname": "poker@luffyD",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "339635453005135872",
            "nickname": "Dr.Durrrq",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "701404694295216128",
            "nickname": "Patrik_Džein",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "789115283633078284",
            "nickname": "polako",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1080045223993946132",
            "nickname": "dolgdrovosek",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "968171201908318288",
            "nickname": "sicko_m",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "963602286343499857",
            "nickname": "gasnetgasli",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "285447114593402880",
            "nickname": "RunoTales",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "971764167830814760",
            "nickname": "FinishDot",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1183029458706374727",
            "nickname": "omaHAssla",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "949199863063646239",
            "nickname": "RAUNDER",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "854448702390796288",
            "nickname": "Uba",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1189886241458634824",
            "nickname": "shmelka",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "429619604705247232",
            "nickname": "Icecow",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "354245261985447936",
            "nickname": "CrashAlex86",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "929612128720142357",
            "nickname": "Vanterra",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "997229659014037669",
            "nickname": "ejukkkk21",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "882994808040353854",
            "nickname": "14fedor88",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "550709395693109268",
            "nickname": "Cola-Coca",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "267379121414340608",
            "nickname": "oypadonki",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "493088482743549952",
            "nickname": "deadpit77",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "784728213304770560",
            "nickname": "MikE161",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "285743297371176961",
            "nickname": "$_serjvikt_$",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "618063545229377572",
            "nickname": "Lucky IXI",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "389156948391755788",
            "nickname": "RedCafe707",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "305335956796473348",
            "nickname": "1KPACAB4uKx",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "222027823127199747",
            "nickname": "n1ghtman199",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "773600913318215690",
            "nickname": "27031982ASZ",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "903077271605227552",
            "nickname": "k1rnasov",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "715564467299156039",
            "nickname": "Jedims2",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "595822682591985665",
            "nickname": "BigRockk",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "291086212062642187",
            "nickname": "camelot1988",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "930853494632615967",
            "nickname": "Stepa29",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "959700249499291698",
            "nickname": "Yarovan",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "448821077733277696",
            "nickname": "Seenax",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "400242115138945024",
            "nickname": "Ivan Dogoter",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1002164526285852713",
            "nickname": "red_caviar22",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "626091393130954764",
            "nickname": "NaYromi",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "670276908100878337",
            "nickname": "sharmmaksim",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "709849282135719966",
            "nickname": "razwad",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1147243583146045551",
            "nickname": "Zig_Zag775",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "515845402759528458",
            "nickname": "kumD",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "298571778513436672",
            "nickname": "Dan",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "509056412027060224",
            "nickname": "somebody",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "294877609131507714",
            "nickname": "OpenOren",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "298464266078519306",
            "nickname": "Jargo",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1023197370671968331",
            "nickname": "super_mar10",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "367734492409888769",
            "nickname": "Esaul11",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1208865233540485164",
            "nickname": "PoulBazilio",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "556807762022236164",
            "nickname": "krank1207",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "469836905098248192",
            "nickname": "qooma",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1154393002605809704",
            "nickname": "kashmen",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1216507810582495314",
            "nickname": "VladislavRudov",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "354751742925340685",
            "nickname": "masher41k93",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1135455204037382214",
            "nickname": "Mao",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "627111875347218442",
            "nickname": "BorgerZero",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "448739063365894154",
            "nickname": "DeadDos",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "1238213959862063164",
            "nickname": "Liprik",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "888810205268307968",
            "nickname": "xotev92",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        },
        {
            "player_id": "330755900874948618",
            "nickname": "Faceaxe111",
            "date_join_mtt": "",
            "mtt_prev_contracts": []
        }
    ],
    "contract_types": [
        {
            "_id": "66e91ff255bd617a847101a3",
            "name": "Тестовая дистанция",
            "type": "number"
        },
        {
            "_id": "66e9200955bd617a847101a4",
            "name": "Тестовый срок",
            "type": "date"
        },
        {
            "_id": "66e9204655bd617a847101a5",
            "name": "Бекинг с обучением. Дистанция",
            "type": "number"
        },
        {
            "_id": "66e9206255bd617a847101a6",
            "name": "Бекинг с обучением. Дата",
            "type": "date"
        },
        {
            "_id": "66e9207755bd617a847101a7",
            "name": "Челлендж на дистанцию",
            "type": "number"
        }
    ]
}
const intensities = [
    99.54082369926599,
    96.37321180090368,
    91.72484301741052,
    85.80425613433269,
    79.04941477315354,
    71.41455267841057,
    63.38174169428845,
    55.28867981598103,
    47.472198656757406,
    40.25434341268666,
    33.92919669857429,
    28.86192310529981,
    24.99992186561306,
    22.632496885620377,
    21.844000739369932,
    22.652496242052138,
    25.00961756670177,
    28.80317798249189,
    33.72558471068878,
    39.80619257939496,
    46.674351612612426,
    54.03741797002786,
    61.584759570024616,
    69.00078714794121,
    75.9780796486668,
    82.23006086451419,
    87.38750946102672,
    91.50077624452257,
    94.26675200517411,
    95.58142987852062,
    95.40196357204489,
    93.74795028340385,
    90.70011621181214,
    86.51499892586467,
    81.16809958247158,
    74.98042023213478,
    68.21616955566188,
    61.16148463611896,
    54.11238128544158,
    47.362385848532085,
    41.33197826079777,
    35.967656946140664,
    31.64555972306518,
    28.538012896211306,
    26.765548041656373,
    26.392270739035602,
    27.42360443341812,
    29.73303311938188,
    33.329935225448835,
    38.014043502600536,
    43.58252492477997,
    49.797155350915915,
    56.39446907866848,
    63.09688712952075,
    69.46938523991182,
    75.56499747716677,
    80.97010432275209,
    85.46404240504833,
    88.86555925915786,
    91.04009214080413,
    91.90505896583545,
    91.43295457066466,
    89.71060056415651,
    86.73226779399471,
    82.65731606993619,
    77.66263004339046,
    71.96228639891473,
    65.79841080704101,
    59.43092551344609,
    53.277553584884345,
    47.28796931866503,
    41.86563417725411,
    37.23322503977488,
    33.57915335241344,
    31.049927240859102,
    29.74430238657223,
    29.695125351583798,
    30.894631830835877,
    33.30215512157689,
    36.81020589450666,
];

export const data = [
    {
        id: 'spectrum',
        color: '#00873E',
        data: intensities.map((y, idx) => {
            return {
                'x':idx/(intensities.length - 1),
                'y':y
            }
        }),
    },
];
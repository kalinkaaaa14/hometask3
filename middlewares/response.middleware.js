const responseMiddleware = (req, res, next) => {
    if (res.err) {
        res.json({
            error: true,
            message: res.err
        })
    } else {
        res.json({
            data: res.data
        })
    }

    res.send()
}

exports.responseMiddleware = responseMiddleware;
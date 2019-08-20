
router.route('/images')
.get(function(req, res) {
    Img.findOne({} , function(err, img) {
        if (err)
            res.send(err);
        // console.log(img);
        res.contentType('json');
        res.send(img);
    }).sort({ createdAt: 'desc' });
});
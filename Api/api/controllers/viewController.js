'use strict';

var View = require('../models/viewModel');

exports.list_a_view = (req, res) => {
    let viewName = req.params.view;
    View.getView(viewName, (err, view) => {
        if(err) return res.send(err);
        res.json(view)
    })
}
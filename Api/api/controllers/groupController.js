'use strict';

var Group = require('../models/groupModel');

exports.create_a_group = function(req, res) {
    var new_group = new Group(req.body);

    if(!new_group.name ) {
        res.status(400).send({
            error: true,
            message: 'Venligst suppler et navn til gruppen'
        });
    } else {
        Group.createGroup(new_group, (err, group) => {
            if(err) res.send(err);
            res.json(group);
        })
    }
}
exports.list_all_groups = (req, res) => {
    Group.getAllGroups((err, groups) => {
        if(err) res.send(err);
        res.json(groups)
    })
}

exports.read_a_group = (req, res) => {
    let group_id = req.params.groupId
    if(!group_id) {
        return res.status(400).send({
            error: true, message: 'Venligst suppler et group ID'
        })
    }
    Group.getGroupById(group_id, (err, group) => {
        if(err) res.send(err);
        res.json(group)
    })
}

exports.update_a_group = (req, res) => {
    let group_id = req.params.groupId,
        group = req.body;
    if(!group_id || !group) {
        return res.status(400).send({
            error: true,
            Message: 'Venligst suppler group og group ID'
        })
    }
    Group.updateById(group_id, group, (err, group) => {
        if(err) res.send(err);
        res.json(group)
    })
}
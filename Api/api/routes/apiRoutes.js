module.exports = function(app) {
    var userList = require('../controllers/userController'),
        groupList = require('../controllers/groupController'),
        commentList = require('../controllers/commentController'),
        viewList = require('../controllers/viewController');
  
    // User Routes
    app.route('/users')
      .get(userList.list_all_users)
      .post(userList.create_a_user);
  
    app.route('/users/:userId')
      .get(userList.read_a_user)
      .put(userList.update_a_user)
      .delete(userList.delete_a_user);

    app.route('/user/:username/:password')
      .get(userList.fetch_user_username);

    // Article Routes
    app.route('/groups')
      .get(groupList.list_all_groups)
      .post(groupList.create_a_group);

    app.route('/groups/:groupId')
      .get(groupList.read_a_group)
      .put(groupList.update_a_group)

    // Comment Routes
    app.route('/chat')
      .get(commentList.list_all_comments)
      .post(commentList.create_a_comment);

    app.route('/chat/commentId')
      .get(commentList.read_a_comment)
      .put(commentList.update_a_comment)
      .delete(commentList.delete_a_comment);

    // View Route
    app.route('/view/:view')
      .get(viewList.list_a_view);
  };
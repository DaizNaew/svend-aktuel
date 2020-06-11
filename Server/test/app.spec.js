const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect, should } = chai;
chai.use(chaiHttp);

const api_ip = "http://127.0.0.1:3000";

// describe('Connection to API', function () {
//     it('We should verify connection to the API', function (done) {
//         chai.request(api_ip)
//         .get("/").end( function (err, res) {
//             expect(res).to.exist;
//             expect(res).to.have.status(200);
//             done();
//         })
//     })
//     describe('Check user creation', function() {
//         it('Make sure we can create a user in the database', function(done) {
//             chai.request(api_ip)
//                 .post("/users")
//                 .type('form')
//                 .send({
//                     '_method': 'post',
//                     'FirstName': 'konrad',
//                     'LastName': 'konradsen',
//                     'Email': 'Konrad@konrad.dk',
//                     'UserName': 'konrad',
//                     'Password': 'konrad'
//                 })
//                 .end(function (err, res) {
//                     expect(res).to.exist;
//                     expect(res).to.have.status(200);
//                     done();
//                     describe('Check API update function', function() {
//                         it('Make sure we can update a user information', function(done) {
//                             chai.request(api_ip)
//                             .put(`/users/${res.res.text}`)
//                             .type('form')
//                             .send({
//                                 'FirstName': 'Gunnar',
//                             })
//                             .end(function (err, res) {
//                                 if(err) done(console.error(err))
//                                 expect(res).to.exist;
//                                 expect(res).to.have.status(200)
//                                 done();
//                             })
//                         })
//                     })
//                     describe('Check API patch function', function() {
//                         it('Should disable an account', function(done) {
//                             chai.request(api_ip)
//                             .delete(`/users/${res.res.text}`)
//                             .end(function (err,res) {
//                                 expect(res).to.exist;
//                                 expect(res).to.have.status(200);
//                                 done();
//                             })
//                         })
//                     })
//                 })
//         })
//     })
//     describe('Check login access', function () {
//         it('Make sure the user logs in to the correct account', function(done) {
//             chai.request(api_ip)
//                 .get("/user/konrad/konrad")
//                 .end( function (err, res) {
//                     if(err) done(console.error(err))
//                     expect(res).to.exist;
//                     expect(res).to.have.status(200);
//                     expect(res.body[0].UserName).to.equal('konrad');
//                     done();
//                 });
//         });
//     })
// })
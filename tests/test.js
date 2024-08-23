const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Admin API', () => {
  it('should register a new admin', (done) => {
    chai.request(app)
      .post('/v1/admin/register')
      .send({
        email: 'test@example.com',
        password1: 'password123',
        password2: 'password123',
        nickname: 'testuser'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('msg', '注册成功');
        done();
      });
  });

  it('should login an admin', (done) => {
    chai.request(app)
      .post('/v1/admin/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('msg', '登录成功');
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

describe('Article API', () => {
  it('should create a new article', (done) => {
    chai.request(app)
      .post('/v1/article')
      .send({
        title: 'Test Article',
        author: 'Test Author',
        content: 'This is a test article.',
        cover: 'http://example.com/cover.jpg',
        category_id: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('msg', '创建文章成功');
        done();
      });
  });

  it('should get an article by id', (done) => {
    chai.request(app)
      .get('/v1/article/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('title', 'Test Article');
        done();
      });
  });
});

describe('Category API', () => {
  it('should create a new category', (done) => {
    chai.request(app)
      .post('/v1/category')
      .send({
        name: 'Test Category',
        key: 'test-category'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('msg', '创建分类成功');
        done();
      });
  });

  it('should get a category by id', (done) => {
    chai.request(app)
      .get('/v1/category/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('name', 'Test Category');
        done();
      });
  });
});

describe('Comments API', () => {
  it('should create a new comment', (done) => {
    chai.request(app)
      .post('/v1/comments')
      .send({
        nickname: 'Test User',
        email: 'testuser@example.com',
        content: 'This is a test comment.',
        article_id: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('msg', '创建评论成功');
        done();
      });
  });

  it('should get comments for an article', (done) => {
    chai.request(app)
      .get('/v1/article/1/comments')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});

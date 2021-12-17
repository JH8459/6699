const { userAuth } = require('../../middlewares/authorized/userAuth')
const { users, sayings, comments, articles, saying_likes, article_likes } = require('../../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = {
  get: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);

      const { email } = req.body;
      const userInfo = await users.findOne({ where: { email: email }});
      
      // 회원의 민감정보(비밀번호) 삭제
      delete userInfo.dataValues.password;

      // 회원정보 반환
      res.status(200).json({ data: { userInfo: userInfo }, message: 'Welcome Mypage!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  patch: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);
      const { email, username, introduction, password } = req.body;

      const userInfo = await users.findOne({ where: { email: email }});
  
      // 요청 바디에 username이 있다면, 나를 제외한 username 중 이미 존재하는지 검사
      if (username) {
        const usernameInfo = await users.findOne({ 
          where: { 
            username: username,
            [Op.not]: [{ id: userInfo.id }]
          }
        });
  
        // 이미 존재하는 username이면 요청 거절
        if (usernameInfo) return res.status(409).json({ message: 'Username Is Already Existed!' });
      }
      // 요청 바디에 password가 있다면, password를 해싱한다
      
      if (password) {
        const hash = await bcrypt.hash(password, 10);
      }
      
      // 요청 바디가 없는 값은 그대로 유지, 있다면 새로 업데이트 한다
      await users.update(
        {
          username: username ? username : userInfo.username,
          introduction: introduction ? introduction : userInfo.introduction,
          password: password ? hash : userInfo.password
        },
        { where : { id: userInfo.id }}
      );
      
      // 새로 업데이트한 회원정보 조회 후 민감정보(비밀번호) 삭제
      const newUserInfo = await users.findOne({ where: { id: userInfo.id }});
      delete newUserInfo.dataValues.password;
      
      // 업데이트된 회원정보 반환
<<<<<<< HEAD
      res.status(200).json({ data: { userInfo: newUserInfo }, message: 'Update Success!' });
=======
      res.status(200).json({ data: { userInfo: newUserInfo }, message: 'Updated Success!' });
>>>>>>> 87cf845c6d0718b0b8a7e23546e756c1eec7655f
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  delete: async (req, res) => {
    try {
      // 로그인 인증 검사
      // const userInfo = await userAuth(req, res);
      const { email, password } = req.body;

      // email, password 중 하나라도 전달이 되지 않은 경우, 다음을 응답한다
      if(!email || !password) return res.status(400).json({ message: 'Bad Request!' });

      const userInfo = await users.findOne({ where: { email: email }});
      // 만약 DB에 일치하는 유저 정보가 없다면, 다음을 응답한다
      if(!userInfo) {
        return res.status(403).json({ message: 'Invalid User!' });
      }
      // 일치하는 유저 정보가 있다면, 해당유저 관련된 DB 삭제 후 탈퇴처리
      else {
        // 유저에 종속된 테이블 검색
        // const subSayings = await sayings.findAll({ where: { user_id: userInfo.id } });
        // const subArticles = await articles.findAll({ where: { user_id: userInfo.id } });
        // const subComments = await comments.findAll({ where: { user_id: userInfo.id } });
        // const subSayingLikes = await saying_likes.findAll({ where: { user_id: userInfo.id } });
        // const subArticleLikes = await article_likes.findAll({ where: { user_id: userInfo.id } });
        
        // 좋아요 한 명언과 게시글이 있었다면 롤백 (advanced)

        // 종속된 하위 테이블 역순으로 삭제
        comments.destroy({ where: { user_id: userInfo.id } });  // 댓글 삭제
        article_likes.destroy({ where: { user_id: userInfo.id } });  // 게시물 좋아요 삭제
        articles.destroy({ where: { user_id: userInfo.id } });  // 게시물 삭제
        saying_likes.destroy({ where: { user_id: userInfo.id } });  // 명언 좋아요 삭제
        sayings.destroy({ where: { user_id: userInfo.id } });  // 명언 삭제

        // 유저 삭제
        users.destroy({ where: { email: email }}); // 유저 삭제
        res.status(200).json({ message: 'Goodbye!' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};
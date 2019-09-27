# 강평강평

- 회원 가입
  - 이메일 보내기
    - sendEmail(string email) -> int number 리턴함
  - 회원가입
    - signup(string private key, string email)
  - 로그인
    - login(string private key)
- 강의
  - 강의 전체 가져오기
    - getCourse()
- 평가
  - 평가 전체 가져오기
    - getEvaluationList(int courseId)
  - 평가 한 개 가져오기
    - getEvaluation(int courseId, int evaluationId)
  - 평가 작성하기
    - uploadEvaluation(int courseId, string content)
  - 평가 좋아요 / 싫어요 가져오기
    - getEvalGoodBad(int courseId, int idx) -> int good, int bad 리턴
  - 평가에 좋아요 누르기
    - addEvalGood(int courseId, int idx)
  - 평가에 싫어요 누르기
    - addEvalBad(int courseId, int idx
- 클레이튼
  - 컨트랙트 잔고 확인
    - getBalance()
  - 클레이튼 결제
    - deposit()
  - 클레이튼 보상
    - transfer(int amount) -> bool 리턴
  

*windows의 경우 package.json의 scripts부분에 모두 cross-env를 붙여주세요 </br> 
-예시: (mac) "build:local": "ENV=LOCAL webpack --config webpack.prod.config.js"</br>
       (windows) "build:local": "cross-env ENV=LOCAL webpack --config webpack.prod.config.js"
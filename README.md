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
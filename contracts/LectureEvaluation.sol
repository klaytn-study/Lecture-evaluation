pragma solidity ^0.4.24;

contract LectureEvaluation {

    mapping (uint256 => EvaluationData[]) private _evaluationList;
    mapping (address => User) private _userList;
    Course[] courseList;

    mapping (uint256 => Eval2Eval[]) private _eval2evalList;

    // event EvalUploaded(uint256 indexed tokenId, uint courseId, string title, uint score, string content, uint timestamp, uint good, uint bad);

    struct User {
        address userAddress;
        string email;
    }

    struct Course {
        uint256 id;
        string campus;
        string name;
        string professor;
    }

    struct EvaluationData {
        address writer;
        string title;
        uint256 score;
        string content;
        uint256 timestamp;
        uint256 good;
        uint256 bad;
    }

    struct Eval2Eval {
        uint256 tokenId;
        address writer;
        bool isEval;
    }

    constructor() public {
        Course memory a = Course(5668, "인문캠퍼스", "금융정책의 이해", "박광민");
        Course memory b = Course(5778, "인문캠퍼스","운영체제", "김상균");
        Course memory c = Course(5966, "인문캠퍼스","소설의 이해", "편혜영");
        Course memory d = Course(5185, "인문캠퍼스","영어회화3", "다니엘");
        Course memory e = Course(5125, "자연캠퍼스","임베디드시스템", "서일주");
        Course memory f = Course(977, "자연캠퍼스","바둑교훈학", "정수현");
        Course memory g = Course(1147, "자연캠퍼스","대지조성계획", "서무현");
        Course memory h = Course(1033, "자연캠퍼스","오케스트라편곡법", "김시형");
        courseList.push(a);
        courseList.push(b);
        courseList.push(c);
        courseList.push(d);
        courseList.push(e);
        courseList.push(f);
        courseList.push(g);
        courseList.push(h);

        EvaluationData memory e1 = EvaluationData(msg.sender, "좋음", 3, "구라임", 1569505157, 1, 1);
        EvaluationData memory e2 = EvaluationData(msg.sender, "운영체제....", 1, "말모...", 1569505613, 2, 0);
        EvaluationData memory e3 = EvaluationData(msg.sender, "짱좋음", 5, "ㅎㅎ퀴즈 짱좋음ㅋ", 1569505553, 0, 4);
        EvaluationData memory e4 = EvaluationData(msg.sender, "경제 정복", 5, "완전 기초부터 알려주심..!", 1569505519, 0, 4);
        EvaluationData memory e5 = EvaluationData(msg.sender, "좋지만..", 4, "교수님 기침하실 때마다 쓰러질까봐 무서움", 1569505613, 0, 4);
        _evaluationList[5778].push(e1);
        _evaluationList[5778].push(e2);
        _evaluationList[5778].push(e3);
        _evaluationList[5668].push(e4);
        _evaluationList[5668].push(e5);

        // _evaluationList[5778][2].good +=1;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getEvalGoodBad(uint _courseId, uint idx) public view returns (uint, uint) {
        return (
            _evaluationList[_courseId][idx].good,
            _evaluationList[_courseId][idx].bad
        );
    }

    function addEvalGood(uint _courseId, uint idx) public {
        require(msg.sender != _evaluationList[_courseId][idx].writer, "내가 쓴 평가에 좋아요 누르기 금지긔");
        // require(_eval2evalList[_courseId][idx].isEval, "이미 평가한 항목입니다.");

        // Eval2Eval memory newEval = Eval2Eval(_courseId, msg.sender, true);
        // _eval2evalList[_courseId].push(newEval);

        _evaluationList[_courseId][idx].good += 1;
    }

    function addEvalBad(uint _courseId, uint idx) public {
        require(msg.sender != _evaluationList[_courseId][idx].writer, "내가 쓴 평가에 싫어요 누르기 금지긔");
        // require(_eval2evalList[_courseId][idx].isEval, "이미 평가한 항목입니다.");

        // Eval2Eval memory newEval = Eval2Eval(_courseId, msg.sender, true);
        // _eval2evalList[_courseId].push(newEval);

        _evaluationList[_courseId][idx].bad += 1;
    }

    function addUser(address _address, string email) public {
        _userList[_address] = User(_address, email);
    }

    function findUser(address _address) public view returns(bool) {
        if (_userList[_address].userAddress == 0) return false;
        else return true;
    }

    function getCourseNum() public view returns(uint) {
        return courseList.length;
    }

    function getEvaluationNum(uint _courseId) public view returns(uint) {
        return _evaluationList[_courseId].length;
    }

    function getCourse (uint _idx) public view returns(uint, string memory, string memory, string memory) {
        require(courseList.length > _idx, "올바르지 않은 강의 번호 입니다.");
        return (
            courseList[_idx].id,
            courseList[_idx].campus,
            courseList[_idx].name,
            courseList[_idx].professor
        );
    } 

    function getEvaluation(uint _courseId, uint _idx) public view returns(string memory, uint, string memory, uint, uint, uint) {
        require(_evaluationList[_courseId].length > _idx, "올바르지 않은 인덱스 입니다.");

        return (
            _evaluationList[_courseId][_idx].title,
            _evaluationList[_courseId][_idx].score,
            _evaluationList[_courseId][_idx].content,
            _evaluationList[_courseId][_idx].timestamp,
            _evaluationList[_courseId][_idx].good,
            _evaluationList[_courseId][_idx].bad
        );
    }

    // 클레이를 송금하는 함수
    function deposit() public payable {
    }

    // 사용자 계정으로 클레이를 보내는 함수
    function transfer(uint amount) public returns(bool) {
        require(getBalance() >= amount, '클레이 잔고가 없어요 ,, ㅠㅠ');
        msg.sender.transfer(amount);
        return true;
    }

  /**
   * @notice _mint() is from ERC721.sol
   */
    function uploadEvaluation(uint _courseId, string _title, uint _score, string _content) public {
        EvaluationData memory newEvaluationData = EvaluationData(msg.sender, _title, _score, _content, now, 0, 0);

        _evaluationList[_courseId].push(newEvaluationData);

        // emit EvalUploaded(tokenId, _courseId, _title, _score, _content, now, 0, 0);
    }
}
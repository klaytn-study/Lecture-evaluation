pragma solidity ^0.4.24;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract LectureEvaluation is ERC721, ERC721Enumerable {

    mapping (uint256 => EvaluationData[]) private _evaluationList;
    mapping (address => User) private _userList;
    Course[] courseList;

    mapping (uint256 => Eval2Eval[]) private _eval2evalList;

    event EvalUploaded(uint256 indexed tokenId, uint courseId, string title, uint score, string content, uint timestamp, uint good, uint bad);

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
        Course memory a = Course(5668, "인문캠퍼스", "금융정책의 이해", "김경제");
        Course memory b = Course(5778, "인문캠퍼스","운영체제", "최데테");
        Course memory c = Course(5125, "자연캠퍼스","행정학개론", "이행정");
        courseList.push(a);
        courseList.push(b);
        courseList.push(c);

        EvaluationData memory e1 = EvaluationData(msg.sender, "좋음", 3, "구라임", 234234, 1, 1);
        EvaluationData memory e2 = EvaluationData(msg.sender, "운영체제....", 1, "말모...", 2342, 2, 0);
        EvaluationData memory e3 = EvaluationData(msg.sender, "짱좋음", 5, "ㅎㅎ퀴즈 짱좋음ㅋ", 2323442, 0, 4);
        EvaluationData memory e4 = EvaluationData(msg.sender, "경제 정복", 5, "완전 기초부터 알려주심..!", 123, 0, 4);
        EvaluationData memory e5 = EvaluationData(msg.sender, "좋지만..", 4, "교수님 기침하실 때마다 쓰러질까봐 무서움", 123, 0, 4);
        _evaluationList[5778].push(e1);
        _evaluationList[5778].push(e2);
        _evaluationList[5778].push(e3);
        _evaluationList[5669].push(e4);
        _evaluationList[5669].push(e5);
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
        require(_eval2evalList[_courseId][idx].isEval, "이미 평가한 항목입니다.");

        Eval2Eval memory newEval = Eval2Eval({
            tokenId: _courseId,
            writer: msg.sender,
            isEval: true
        });

        _eval2evalList[_courseId].push(newEval);

        _evaluationList[_courseId][idx].good += 1;
        transfer(1);
    }

    function addEvalBad(uint _courseId, uint idx) public {
        require(msg.sender != _evaluationList[_courseId][idx].writer, "내가 쓴 평가에 싫어요 누르기 금지긔");
        require(_eval2evalList[_courseId][idx].isEval, "이미 평가한 항목입니다.");

        Eval2Eval memory newEval = Eval2Eval({
            tokenId: _courseId,
            writer: msg.sender,
            isEval: true
        });

        _eval2evalList[_courseId].push(newEval);

        _evaluationList[_courseId][idx].bad += 1;
        transfer(1);
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

    function getEvaluation(uint _courseId, uint _idx, bool isAll) public view returns(string memory, uint, string memory, uint) {
        require(_evaluationList[_courseId].length > _idx, "올바르지 않은 인덱스 입니다.");

        return (
            _evaluationList[_courseId][_idx].title,
            _evaluationList[_courseId][_idx].score,
            _evaluationList[_courseId][_idx].content,
            _evaluationList[_courseId][_idx].timestamp
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
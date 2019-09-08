pragma solidity ^0.4.24;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract Klaystagram is ERC721, ERC721Enumerable {

    event EvaluationUploaded (uint256 indexed tokenId, address writer, string content, uint256 timestamp);

    // mapping (uint256 => CourseData) private _courseList;
    mapping (uint256 => EvaluationData[]) private _evaluationList;
    mapping (address => User) private _userList;
    Course[] courseList;

    struct User {
        address userAddress;
        string email;
    }

    struct Course {
        uint256 id;
        string name;
        string professor;
    }

    struct EvaluationData {
        uint256 tokenId;
        address writer;
        string content;
        uint256 timestamp;
    }

    constructor() public {
        Course memory a = Course(5668, "금융정책의 이해", "김경제");
        Course memory b = Course(5778, "운영체제", "최데테");
        Course memory c = Course(5125, "행정학개론", "이행정");
        courseList.push(a);
        courseList.push(b);
        courseList.push(c);
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

    function getCourse (uint _idx) public view returns(uint, string memory, string memory) {
        require(courseList.length > _idx, "올바르지 않은 강의 번호 입니다.");
        return (
            courseList[_idx].id,
            courseList[_idx].name,
            courseList[_idx].professor
        );
    } 

    function getEvaluation(uint _courseId, uint _idx) public view returns(string memory, uint) {
        require(_evaluationList[_courseId].length > _idx, "올바르지 않은 인덱스 입니다.");
        return (
            _evaluationList[_courseId][_idx].content,
            _evaluationList[_courseId][_idx].timestamp
        );
    }

  /**
   * @notice _mint() is from ERC721.sol
   */
    function uploadEvaluation(uint _courseId, string _content) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        // address[] memory ownerHistory;

        EvaluationData memory newEvaluationData = EvaluationData({
            tokenId : tokenId,
            writer : msg.sender,
            content : _content,
            timestamp : now
        });

        _evaluationList[_courseId].push(newEvaluationData);

        emit EvaluationUploaded(tokenId, msg.sender, _content, now);
    }
}
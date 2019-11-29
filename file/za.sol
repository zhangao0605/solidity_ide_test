pragma solidity > 0.4.19;
contract MyFirst{
    uint256 a = 21233;
    string str = "Hello";
    function getA() public view returns(uint256 data)
    {
        return a;
    }
    function getString() public view returns(string memory data)
    {
        return str;
    }  
    function setString(string memory data) public
    {
        str = data;
    }  
}
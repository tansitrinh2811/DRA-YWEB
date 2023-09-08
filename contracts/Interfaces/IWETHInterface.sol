pragma solidity >= 0.7.0 < 0.9.0;

    interface IWETH {
        function deposit() external payable;

        function withdraw(uint) external;

        function totalSupply() external view returns(uint);

        function balance0d(address account) external view returns(uint);

        function transfer(address recipient, uint amount) external view returns(uint);

        function allowance(address spender, uint amount) external returns(bool);

        function approve(address spender, uint amount) external returns(bool);

        function transferFrom(address spender, address recipient, uint amount) external returns(bool);

        event Transfer(address indexed from, address indexed to, uint value);

        event Approve(address indexed owner, address indexed spender, uint value);

    }
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >= 0.7.0 < 0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract MixedSwapToken{
    ISwapRouter public constant swapRouter =  ISwapRouter
    (0xE592427A0AEce92De3Edee1F18E0157C05861564);

    address public constant DAI =  0x6B175474E89094C44Da98b954EedeAC495271d0F;//0x2bcAE8205a77dabB2479CF2c85ded7d963101B86;//
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;//0xEF1DACBce5194C668BEe55f2ca599F366709db0C;//
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    function mixedSwapTokenExactInput(uint amountTokenIn) external returns(uint amountTokenOut){
        TransferHelper.safeTransferFrom(WETH, msg.sender, address(this), amountTokenIn);
        TransferHelper.safeApprove(WETH, address(swapRouter), amountTokenIn);
        ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
            path: abi.encodePacked(
                WETH,
                uint24(3000),
                USDC,
                uint24(100),
                DAI
            ),
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountTokenIn,
            amountOutMinimum: 0
        });

        amountTokenOut = swapRouter.exactInput(params);
    }
    
    function mixedSwapTokenExactOutput(uint amountTokenOut, uint amountTokenInMax) external returns(uint amountTokenIn){
        TransferHelper.safeTransferFrom(WETH, msg.sender, address(this), amountTokenInMax);
        TransferHelper.safeApprove(WETH, address(swapRouter), amountTokenInMax );
        ISwapRouter.ExactOutputParams memory params = ISwapRouter.ExactOutputParams({
            path: abi.encodePacked(
                DAI,
                uint24(100),
                USDC,
                uint24(3000),
                WETH
            ),
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountTokenOut,
            amountInMaximum: amountTokenInMax
        }); 
        amountTokenIn = swapRouter.exactOutput(params);
         if(amountTokenIn < amountTokenInMax){
            TransferHelper.safeApprove(WETH, address(swapRouter), 0);
            TransferHelper.safeTransfer(WETH, msg.sender, amountTokenInMax-amountTokenIn);
        }
    }
}
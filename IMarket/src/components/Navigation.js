import { ethers } from 'ethers'

const Navigation = ({ account, setAccount, setSearchTerm }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }
    
    return (
        <nav>
            <div className='nav__brand'>
                <h1>Dramaket</h1>
            </div>

            <input
                type="text"
                placeholder='Product'
                className="nav__search"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href="#Smart Device">Smart Device</a></li>
                <li><a href="#NFT">NFT</a></li>
                <li><a href="#Game Limit">Game Limit</a></li>
                <li><a href="#Pet">Pet</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;
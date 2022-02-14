//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Mules is ERC721, ERC721Enumerable, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address private devAddress = 0xd0B7DdF714125438eb86315CC955C06002F6Be1F;
    address payable public depositAddress = payable(devAddress);

    string public baseExtension = ".json";
    uint256 public maxSupply = 1337;
    uint256 public price = 1.5 ether;

    string public baseURI;
    mapping(address => uint8) public whitelistedAddress;

    constructor(string memory URI) ERC721("FantomMules", "MLS") {
        setBaseURI(URI);
        _pause();
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setBaseURI(string memory _URI) public onlyOwner {
        baseURI = _URI;
    }

    function setDepositAddress(address payable _to) public onlyOwner {
        depositAddress = _to;
    }

    function updateSupply(uint256 _supply) public onlyOwner {
        maxSupply = _supply;
    }

    function updatePrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function reserveForGiveaway(uint256 _amount) public onlyOwner {
        for (uint256 i = 0; i < _amount; i++) {
            internalMint(devAddress);
        }
    }

    function mintForGiveaway(address _address) public onlyOwner {
        internalMint(_address);
    }

    function mint(uint256 _amount) public payable whenNotPaused {
        require(msg.value == (price * _amount), "Invalid amount");
        depositAddress.transfer(price * _amount);

        for (uint256 i = 0; i < _amount; i++) {
            internalMint(msg.sender);
        }
    }

    function redeemAvailable(address _address) public view returns (uint8) {
        return whitelistedAddress[_address];
    }

    function redeem(uint8 _amount) public payable whenNotPaused {
        require(
            whitelistedAddress[msg.sender] > 0,
            "The address can no longer redeem"
        );
        require(
            _amount <= whitelistedAddress[msg.sender],
            "All mints of the address are over"
        );

        whitelistedAddress[msg.sender] -= _amount;
        for (uint8 i = 0; i < _amount; i++) {
            internalMint(msg.sender);
        }
    }

    function addWhitelistAddresses(address[] memory _addresses)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _addresses.length; i++) {
            require(_addresses[i] != address(0), "Address cannot be 0.");
            whitelistedAddress[_addresses[i]]++;
        }
    }

    function MulesOwned(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 index;

            for (index = 0; index < tokenCount; index++) {
                result[index] = tokenOfOwnerByIndex(_owner, index);
            }

            return result;
        }
    }

    function internalMint(address _to) internal {
        _tokenIds.increment();
        require(_tokenIds.current() < maxSupply, "All Mules have been minted!");
        _safeMint(_to, _tokenIds.current());
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        Strings.toString(tokenId),
                        baseExtension
                    )
                )
                : "";
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

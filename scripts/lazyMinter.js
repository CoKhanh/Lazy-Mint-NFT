const { LazyMinter } = require("./lazyMint");

async function main() {

    // Get our account (as deployer) to verify that a minimum wallet balance is available
    const [deployer] = await ethers.getSigners();

    // Fetch the compiled contract using ethers.js
    const NFT = await ethers.getContractFactory("NFT");
    // calling deploy() will return an async Promise that we can await on 
    const nft = await NFT.deploy(deployer.address);
    console.log(`Contract deployed to address: ${nft.address}`);

    const lazyMint = new LazyMinter({contract: nft, signer: deployer})
    const voucher = await lazyMint.createVoucher(1, "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi")

    const redeemRes = await nft.redeem("0xCeE572152936bbcaC0cB7A7c58852a7E6b928cd6", voucher)
    console.log('Tx hash of redeemer', redeemRes.hash);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
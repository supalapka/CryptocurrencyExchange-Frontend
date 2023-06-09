<template>
    <div class="staking-block">
        <div class="staking-image-container">
            <img src="@/images/staking.png" class="staking-image">
        </div>
        <div class="staking-content">
            <h2 class="staking-title">Staking Information</h2>
            <p class="staking-description">
                Crypto staking is a process that allows individuals to participate in the validation and security of
                blockchain networks while earning rewards in the form of additional cryptocurrency. Staking involves
                holding and "staking" a certain amount of a particular cryptocurrency in a designated wallet to support
                the network's operations.
            </p>
            <button @click="this.$router.push('/staking')" class="button">Stake Crypto Now</button>
        </div>
    </div>
</template>

<style scoped>
.staking-block {
    border-radius: 20px;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.staking-image-container {
    width: 65%;
    margin-right: 40px;
}

.staking-image {
    width: 100%;
    display: block;
}

.staking-content {
    width: 60%;
}

.staking-title {
    font-size: 32px;
    color: #dbdbdb;
    margin-bottom: 20px;
    text-shadow: 0 3px 6px rgba(179, 179, 179, 0.342);

}

.staking-description {
    color: #dbdbdb;
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 30px;
    text-shadow: 0 3px 6px rgba(179, 179, 179, 0.219);
}

.button {
    display: inline-block;
    background-color: #292a3a;
    color: white;
    font-size: 24px;
    font-weight: bold;
    padding: 10px 30px;
    border-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    margin-bottom: 20px;
    border: none;
}

.button:hover {
    background-color: #3d3e4e;
}
</style>
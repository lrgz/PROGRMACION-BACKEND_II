const fs = require('fs').promises
const CartManagerFile = require('./cartFile')
const cm = new CartManagerFile()

class UserManagerFile {
    constructor() {
        this.filename = '../../storage/users.json'
        this.initializeFile()
    }

    async initializeFile() {
        try {
            await fs.access(this.filename);
        } catch (error) {
            await fs.writeFile(this.filename, '[]');
            
        }
    }

    async getUsers() {
        try {
            const data = await fs.readFile(this.fileName, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error('Error reading users file:', error);
        }
    }

    async getUserById(uid) {
        try{
            const data = await fs.readFile(this.fileName, 'utf8');
            const users = JSON.parse(data);
            return users.find(user => user.cart === cartId);
        }catch(error){
            throw new Error(error)
        }
    }

    async getUserByEmail(email) {
        try {
            const data = await fs.readFile(this.fileName, 'utf8');
            const users = JSON.parse(data);
            return users.find(user => user.email === email);
        } catch (error) {
            throw new Error('Error reading users file:', error);
        }
    }

    async getUserByLogin(email, password) {
        try {
            const data = await fs.readFile(this.fileName, 'utf8');
            const users = JSON.parse(data);
            return users.find(user => user.email === email && user.password === password);
        } catch (error) {
            throw new Error('Error reading users file:', error);
        }
    }

    async addUser(user) {
        try {
            const data = await fs.readFile(this.fileName, 'utf8');
            const users = JSON.parse(data);
            const userCart = await cm.createCart()
            user.cart = userCart
            user._id = users.length + 1
            users.push(user);
            await fs.writeFile(this.fileName, JSON.stringify(users));
            return users
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(uid, updatedUser) {
        try {
            const data = await fs.readFile(this.fileName, 'utf8');
            const users = JSON.parse(data);
            const index = users.findIndex(user => user._id === uid);
            if (index !== -1) {
                users[index] = { ...users[index], ...updatedUser };
                await fs.writeFile(this.fileName, JSON.stringify(users));
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            throw new Error('Error updating user: ' + error);
        }
    }

    async deleteUser(uid) {
        try {
            const data = await fs.readFile(this.fileName, 'utf8');
            const users = JSON.parse(data);
            const index = users.findIndex(user => user._id === uid);
            if (index !== -1) {
                users.splice(index, 1);
                await fs.writeFile(this.fileName, JSON.stringify(users));
            }
            return users
        } catch (error) {
            throw new Error('Error deleting user:', error);
        }
    }
}

module.exports = UserManagerFile
/*
 * 应用在这里初始化所有的数据库表
 *
 */
import query from '@/lib/service'
import { getUid } from '@/lib/utils'

// 用户表
async function seedUesrs() {
    const statements = `
        CREATE TABLE IF NOT EXISTS users (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 角色表
async function seedRoles() {
    const statements = `
        CREATE TABLE IF NOT EXISTS roles (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL UNIQUE,
            description VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 权限表
async function seedPermissions() {
    const statements = `
        CREATE TABLE IF NOT EXISTS permissions (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL UNIQUE,
            description VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 用户角色表
async function seedUserRole() {
    const statements = `
        CREATE TABLE IF NOT EXISTS user_role (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL AUTO_INCREMENT,
            user_id INT NOT NULL,
            role_id INT NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY(id, user_id, role_id)
        );`

    await query(statements)
}

// 角色权限表
async function seedRolePermission() {
    const statements = `
        CREATE TABLE IF NOT EXISTS role_permission (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL AUTO_INCREMENT,
            role_id INT NOT NULL,
            permission_id INT NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY(id, role_id, permission_id)
        );`

    await query(statements)
}

// 设置表
async function seedSettings() {
    const statements = `
        CREATE TABLE IF NOT EXISTS settings (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) UNIQUE,
            value TINYINT,
            title VARCHAR(255) UNIQUE,
            description VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 聊天
async function seedDiscussions() {
    const statements = `
        CREATE TABLE IF NOT EXISTS discussions (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255),
            description VARCHAR(255),
            user_id INT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 聊天信息
async function seedMessages() {
    const statements = `
        CREATE TABLE IF NOT EXISTS messages (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            discussions_id INT,
            star_id INT,
            content MEDIUMTEXT,
            play_order INT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 领衔主演
async function seedStars() {
    const statements = `
        CREATE TABLE IF NOT EXISTS stars (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            nickname VARCHAR(255),
            description VARCHAR(255),
            avatar_url VARCHAR(255),
            user_id INT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 动态
async function seedMoments() {
    const statements = `
        CREATE TABLE IF NOT EXISTS moments (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            content MEDIUMTEXT,
            user_id INT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 评论表
async function seedComments() {
    const statements = `
        CREATE TABLE IF NOT EXISTS comments (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            content MEDIUMTEXT,
            target_uid VARCHAR(255),
            user_id INT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 点赞表
async function seedLikes() {
    const statements = `
        CREATE TABLE IF NOT EXISTS likes (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            target_uid VARCHAR(255),
            user_id INT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

async function initalizeData() {
    // 初始化设置表中的数据
    const insertRegisterSettingsStatements = `
        INSERT INTO settings (uid, name, value, title, description) VALUES (?, 'FREE_REGISTER', '0', '允许注册', '是否允许自由注册');`

    await query(insertRegisterSettingsStatements, [getUid()])

    // 初始化权限表中的数据
    const insertSettingPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'UPDATE_SETTINGS', '调整设置', '调整SUYO的设置，例如分类，注册行为');`

    const insertCreateUserPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'CREATE_USER', '添加用户', '创建新用户的权限');`

    const insertCreateContentPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'CREATE_CONTENT', '创建新内容', '例如创建新刊，添加新的聊天片段');`

    const updateContentPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'UPDATE_CONTENT', '修改站点的所有内容', '默认情况下仅能修改自己创建的内容，拥有该权限后可更新站点所有内容');`

    const insertAuthPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'AUTH', '授权', '为其他用户授权');`

    const [setting] = await query(insertSettingPermissionsStatements, [getUid()])
    const [createUser] = await query(insertCreateUserPermissionsStatements, [getUid()])
    const [createContent] = await query(insertCreateContentPermissionsStatements, [getUid()])
    const [updateContent] = await query(updateContentPermissionsStatements, [getUid()])
    const [auth] = await query(insertAuthPermissionsStatements, [getUid()])

    const settingPermissionId = setting.insertId
    const createUserPermissionId = createUser.insertId
    const createContentPermissionId = createContent.insertId
    const updateContentPermissionId = updateContent.insertId
    const authPermissionId = auth.insertId

    // 初始化角色表中的数据
    const insertRootStatements = `
        INSERT INTO roles (uid, name, title, description) VALUES (?, 'ROOT', '超级管理员', '超级管理员，仅能设置一位，可以进行全部操作');`

    const insertAdminStatements = `
        INSERT INTO roles (uid, name, title, description) VALUES (?, 'ADMIN', '管理员', '管理员，可以进行大部分操作');`

    const insertUserStatements = `
        INSERT INTO roles (uid, name, title, description) VALUES (?, 'USER', '注册用户', '普通用户，可以发帖，添加新刊');`

    const [root] = await query(insertRootStatements, [getUid()])
    const [admin] = await query(insertAdminStatements, [getUid()])
    const [user] = await query(insertUserStatements, [getUid()])

    const rootId = root.insertId
    const adminId = admin.insertId
    const userId = user.insertId

    // 为角色初始化权限
    const authorizationStatements = `
        INSERT INTO role_permission (uid, role_id, permission_id) VALUES (?, ?, ?);`

    await query(authorizationStatements, [getUid(), rootId, settingPermissionId])
    await query(authorizationStatements, [getUid(), rootId, createUserPermissionId])
    await query(authorizationStatements, [getUid(), rootId, createContentPermissionId])
    await query(authorizationStatements, [getUid(), rootId, updateContentPermissionId])
    await query(authorizationStatements, [getUid(), rootId, authPermissionId])

    await query(authorizationStatements, [getUid(), adminId, settingPermissionId])
    await query(authorizationStatements, [getUid(), adminId, createUserPermissionId])
    await query(authorizationStatements, [getUid(), adminId, createContentPermissionId])
    await query(authorizationStatements, [getUid(), rootId, updateContentPermissionId])

    await query(authorizationStatements, [getUid(), userId, createContentPermissionId])
}

async function main() {
    await seedUesrs()
    await seedRoles()
    await seedPermissions()
    await seedUserRole()
    await seedRolePermission()
    await seedSettings()
    await seedStars()
    await seedDiscussions()
    await seedMessages()
    await seedMoments()
    await seedComments()
    await seedLikes()

    try {
        await initalizeData()
    } catch (e) {
        if (!String(e).includes('Duplicate entry')) {
            throw new Error(e)
        }
    }

    console.log('数据库配置完成')
}

main().catch((error) => {
    console.log(error)
})
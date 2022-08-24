// Not(ahmet): Bu kodun statik kod olduğunun farkındayım fakat sunucu yetersizlikleri sebebiyle veritabanı bağlayamam.
// Bu şekilde çok işlevsel olmasa da idare eder bir bot olduğunu düşünüyorum. Önerilerinizi bana iletebilirsiniz.

require('dotenv').config();
const ViolentChars = require('./ViolentChars.json');
const Lecturers = require('./Lecturers.json');
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const prefix = process.env.PREFIX;
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

const hello_messages = ['merhaba', 'selam', 'sa', 'hi', 'hello'];

const getByName = (name) => {
    return Lecturers.filter(
        function (data) { return data.name.includes(name) }
    );
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    let messageContent = message.content.toLowerCase();
    let channel = client.channels.cache.get(message.channelId);
    if (hello_messages.includes(messageContent.toLowerCase().trim())) { await channel.send('https://i.hizliresim.com/s3b2ir9.gif'); }
    if (ViolentChars.ViolentChars.some(v => messageContent.includes(v))) {
        await message.delete().then(async msg => {
            let kufurEmbed = new EmbedBuilder()
                .setColor(0xFC0000)
                .setTitle('Uyarı!')
                .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                .setDescription(`${msg.author}`)
                .setImage('https://i.hizliresim.com/mjx9449.gif')
                .setTimestamp()
                .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });
            await channel.send({ embeds: [kufurEmbed] });
        })
    }
    if (!messageContent.startsWith(prefix)) return;
    let commandArray = messageContent.trim().slice(2).split(' ');
    let command = commandArray.shift();
    let parameters = commandArray.join(' ').trim();
    switch (command) {
        case 'iletisim':
            if (parameters.toLowerCase().trim() === '') {
                await channel.send(`İsim belirtmelisiniz. ${message.author}`);
                return;
            }
            let select = getByName(parameters.toLowerCase().trim());
            let tempMessage = [];
            for (let i = 0; i < select.length; i++) {
                tempMessage.push(`${select[i].print_name}, E-Posta: **${select[i].email}**`);
            }
            if (tempMessage.length === 0) {
                await channel.send('Belirtilen isimde bir öğretim üyesi bulunamadı.');
                return
            }
            await channel.send(tempMessage.join('\n'));
            break;
        case 'duyurular':
            await channel.send('Bilgisayar mühendisliği duyurularına: https://bilmuh.ksbu.edu.tr/index/duyurular/ adresinden ulaşabilirsin!');
            break;
        case 'yardım':
            switch (parameters) {
                case 'duyurular':
                    let duyurularEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('k/duyurular')
                        .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                        .setDescription('Duyurular komut kullanımı.')
                        .addFields(
                            { name: 'Kullanım:', value: 'k/duyurular' },
                            { name: 'Açıklama:', value: 'Bilgisayar mühendisliği duyurularına ulaşabileceğiniz iletişim bağlantısını gönderir.' },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });

                    channel.send({ embeds: [duyurularEmbed] });
                    break;
                case 'iletisim':
                    let mailEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('k/iletisim')
                        .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                        .setDescription('İletişim komut kullanımı.')
                        .addFields(
                            { name: 'Kullanım:', value: 'k/iletisim <İsim>' },
                            { name: 'Açıklama:', value: 'Bilgisayar mühendisliği duyurularına ulaşabileceğiniz iletişim bağlantısını gönderir.' },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });

                    channel.send({ embeds: [mailEmbed] });
                    break;
                case 'ban':
                    let banEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('k/ban')
                        .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                        .setDescription('Ban komut kullanımı.')
                        .addFields(
                            { name: 'Kullanım:', value: 'k/ban <@Kişi>' },
                            { name: 'Açıklama:', value: '@ ile belirtilen kullanıcıyı sunucudan süresiz olarak yasaklamaya yarar.' },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });

                    channel.send({ embeds: [banEmbed] });
                    break;
                case 'kick':
                    let kickEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('k/kick')
                        .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                        .setDescription('Kick komut kullanımı.')
                        .addFields(
                            { name: 'Kullanım:', value: 'k/kick <@Kişi>' },
                            { name: 'Açıklama:', value: '@ ile belirtilen kullanıcıyı sunucudan uzaklaştırmaya yarar.' },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });

                    channel.send({ embeds: [kickEmbed] });
                    break;
                case 'rolver':
                    let rolverEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('k/rolver')
                        .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                        .setDescription('Rolver komut kullanımı.')
                        .addFields(
                            { name: 'Kullanım:', value: 'k/rolver <@Kişi> <@Rol>' },
                            { name: 'Açıklama:', value: '@ ile belirtilen kullanıcıya @ ile belirtilen rolü verir.' },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });

                    channel.send({ embeds: [rolverEmbed] });
                    break;
                case 'rolal':
                    let rolalEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('k/rolal')
                        .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                        .setDescription('Rolal komut kullanımı.')
                        .addFields(
                            { name: 'Kullanım:', value: 'k/rolal <@Kişi> <@Rol>' },
                            { name: 'Açıklama:', value: '@ ile belirtilen kullanıcıdan @ ile belirtilen rolü alır.' },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });

                    channel.send({ embeds: [rolalEmbed] });
                    break;
                case 'temizle':
                    let temizleEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('k/temizle')
                        .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                        .setDescription('Temizle komut kullanımı.')
                        .addFields(
                            { name: 'Kullanım:', value: 'k/temizle <Mesaj sayısı>' },
                            { name: 'Açıklama:', value: 'Belirtilen mesaj sayısı kadar mesajı temizler. En fazla 100 en az 2 değerini alır.' },
                        )
                        .setTimestamp()
                        .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });

                    channel.send({ embeds: [temizleEmbed] });
                    break;
                default:
                    await channel.send(
                        '**Sunucumuza hoşgeldin!**\nKomutlar hakkında özel olarak yardım almak için **\'k/yardım <Komut adı>\'** şeklinde yazabilirsin.\n**Temel komutlar: \n> k/yardım\n> k/iletisim\n> k/duyurular\nYönetici komutları:\n> k/ban\n> k/kick\n> k/rolver\n> k/rolal**'
                    );
                    break;
            }
            break;
        case 'ban':
            if (parameters !== undefined && parameters !== null && parameters !== '') {
                if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                    let ban_requested_user = message.mentions.members.first()
                    if (ban_requested_user === undefined) {
                        await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi belirtmelisiniz. ${message.author}`, ephemeral: true })
                        return;
                    }
                    if (ban_requested_user.bannable) {
                        let banEmbed = new EmbedBuilder()
                            .setColor(0xFC0000)
                            .setTitle('YASAKLAMA!')
                            .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                            .setDescription('Kullanıcı yasaklama bildirimi.')
                            .setImage('https://i.hizliresim.com/q81h78g.png')
                            .addFields(
                                { name: 'Yasaklayan', value: `${message.author}`, inline: true },
                                { name: 'Yasaklanan', value: `${ban_requested_user}`, inline: true },
                            )
                            .setTimestamp()
                            .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });
                        ban_requested_user.ban();
                        await channel.send({ embeds: [banEmbed] });
                    } else {
                        await channel.send(`${message.author}, Bu kişiyi yasaklamak için yetkiniz yok!`);
                    }
                } else {
                    await channel.send(`Bu komutu kullanmak için yetkiniz yok. ${message.author}`)
                }
            } else {
                await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi belirtmelisiniz. ${message.author}`, ephemeral: true })
            }
            break;
        case 'kick':
            if (parameters !== undefined && parameters !== null && parameters !== '') {
                if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                    let kick_requested_user = message.mentions.members.first()
                    if (kick_requested_user === undefined) {
                        await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi belirtmelisiniz. ${message.author}`, ephemeral: true })
                        return;
                    }
                    if (kick_requested_user.kickable) {
                        let kickEmbed = new EmbedBuilder()
                            .setColor(0xFC0000)
                            .setTitle('UZAKLAŞTIRMA!')
                            .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                            .setDescription('Kullanıcı uzaklaştırma bildirimi.')
                            .setImage('https://i.hizliresim.com/2sfkvle.png')
                            .addFields(
                                { name: 'Uzaklaştıran', value: `${message.author}`, inline: true },
                                { name: 'Uzaklaştırılan', value: `${kick_requested_user}`, inline: true },
                            )
                            .setTimestamp()
                            .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });
                        kick_requested_user.kick();
                        await channel.send({ embeds: [kickEmbed] });
                    } else {
                        await channel.send(`${message.author}, Bu kişiyi uzaklaştırmak için yetkiniz yok!`);
                    }
                } else {
                    await channel.send(`Bu komutu kullanmak için yetkiniz yok. ${message.author}`)
                }
            } else {
                await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi belirtmelisiniz. ${message.author}`, ephemeral: true })
            }
            break;
        case 'rolver':
            if (parameters !== undefined && parameters !== null && parameters !== '') {
                if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                    let role_requested_user = message.mentions.members.first();
                    let requested_role = message.mentions.roles.first();
                    if (role_requested_user === undefined || requested_role === undefined) {
                        await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi ve yetki belirtmelisiniz. ${message.author}`, ephemeral: true })
                        return;
                    }
                    if (role_requested_user.id === message.guild.ownerId) {
                        await channel.send(`Bu komutu bu kişi için kullanamazsınız. ${message.author}`);
                        return;
                    }
                    if (role_requested_user.roles.cache.has(requested_role.id)) {
                        await channel.send(`${role_requested_user} zaten bu yetkiye sahip. ${message.author}`)
                    } else {
                        role_requested_user.roles.add(requested_role.id);
                        let roleEmbed = new EmbedBuilder()
                            .setColor(0x07D010)
                            .setTitle('Rol verildi!')
                            .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                            .setDescription('Kullanıcı yetkilendirme bildirimi')
                            .setImage('https://i.hizliresim.com/o1rqqqq.png')
                            .addFields(
                                { name: 'Rol veren', value: `${message.author}`, inline: true },
                                { name: 'Rol alan', value: `${role_requested_user}`, inline: true },
                            )
                            .setTimestamp()
                            .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });
                        await channel.send({ embeds: [roleEmbed] });
                    }
                } else {
                    await channel.send(`Bu komutu kullanmak için yetkiniz yok. ${message.author}`)
                }
            } else {
                await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi belirtmelisiniz. ${message.author}`, ephemeral: true })
            }
            break;
        case 'rolal':
            if (parameters !== undefined && parameters !== null && parameters !== '') {
                if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                    let role_requested_user = message.mentions.members.first();
                    let requested_role = message.mentions.roles.first();
                    if (role_requested_user === undefined || requested_role === undefined) {
                        await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi ve yetki belirtmelisiniz. ${message.author}`, ephemeral: true })
                        return;
                    }
                    if (role_requested_user.id === message.guild.ownerId) {
                        await channel.send(`Bu komutu bu kişi için kullanamazsınız. ${message.author}`);
                        return;
                    }
                    if (!role_requested_user.roles.cache.has(requested_role.id)) {
                        await channel.send(`${role_requested_user} zaten bu yetkiye sahip değil. ${message.author}`)
                    } else {
                        role_requested_user.roles.remove(requested_role.id);
                        let roleEmbed = new EmbedBuilder()
                            .setColor(0xFC0000)
                            .setTitle('Rol alındı!')
                            .setAuthor({ name: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png', url: 'https://bilmuh.ksbu.edu.tr' })
                            .setDescription('Kullanıcı yetkisini alma bildirimi')
                            .setImage('https://i.hizliresim.com/o1rqqqq.png')
                            .addFields(
                                { name: 'Rolü alan', value: `${message.author}`, inline: true },
                                { name: 'Rolü alınan', value: `${role_requested_user}`, inline: true },
                            )
                            .setTimestamp()
                            .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });
                        await channel.send({ embeds: [roleEmbed] });
                    }
                } else {
                    await channel.send(`Bu komutu kullanmak için yetkiniz yok. ${message.author}`)
                }
            } else {
                await channel.send({ content: `Bu komutu kullanırken dikkatli olun! Kişi belirtmelisiniz. ${message.author}`, ephemeral: true })
            }
            break;
        case 'temizle':
            if (parameters !== undefined && parameters !== null && parameters !== '') {
                if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
                    let clear_amount = parseInt(parameters);
                    if (isNaN(clear_amount)) {
                        await channel.send({ content: `Temizlenecek mesaj sayısını belirtmeniz gerek. ${message.author}`, ephemeral: true })
                        return;
                    } else if (clear_amount > 100 || clear_amount < 2) {
                        await channel.send(`${message.author}, tek seferde en fazla 100, en az 2 adet mesaj temizleyebilirsiniz.`);
                        return;
                    } else {
                        await channel.bulkDelete(clear_amount, true).catch(async err => {
                            await channel.send('Sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                            return;
                        }).then(async response => {
                            let size = response.size;
                            let deleteEmbed = new EmbedBuilder()
                                .setColor(0x07D010)
                                .setTitle('Temizlik vakti!')
                                .setDescription(`${size} adet mesaj ${message.author} tarafından temizlendi.`)
                                .setTimestamp()
                                .setFooter({ text: 'KSBÜ Bilgisayar Mühendisliği', iconURL: 'https://tip.ksbu.edu.tr/app/views/panel/images/logo.png' });
                            await channel.send({ embeds: [deleteEmbed] });
                        })
                    }
                } else {
                    await channel.send(`Bu komutu kullanmak için yetkiniz yok. ${message.author}`)
                }
            } else {
                await channel.send({ content: `Temizlenecek mesaj sayısını belirtmeniz gerek. ${message.author}`, ephemeral: true })
            }
            break;
        default:
            break;
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    switch (interaction.commandName) {
        case 'ping':
            await interaction.reply({ content: 'Pong! (Biraz uykum geldi ama hala ayaktayım..)', ephemeral: true });
            break;
        default:
            break;
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
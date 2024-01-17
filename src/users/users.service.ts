import { Injectable } from '@nestjs/common';

interface userProps {
  name: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
interface updateUserProps {
  name?: string;
  email?: string;
  role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      role: 'MANAGER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'julianne.oconner@kory.org',
      role: 'DESIGNER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'lucio_hettinger@annie.ca',
      role: 'DEVELOPER',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      email: 'karley_dach@jasper.info',
      role: 'ADMIN',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      email: 'telly.hoeger@billy.biz',
      role: 'ARCHITECT',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      email: 'sherwood@rosamond.me',
      role: 'ANALYST',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      email: 'chaim_mcdermott@dana.io',
      role: 'DATA SCIENTIST',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      email: 'rexy.nienow@rosalia.io',
      role: 'MARKETING',
    },
    {
      id: 11,
      name: 'Leopoldo Corkery',
      email: 'letitia@alva.tv',
      role: 'PRODUCT MANAGER',
    },
    {
      id: 12,
      name: 'Rocio Schuster',
      email: 'sabina.klein@molly.biz',
      role: 'QA ENGINEER',
    },
    {
      id: 13,
      name: 'Kathleen Reichert',
      email: 'bridget@chad.biz',
      role: 'UI/UX DESIGNER',
    },
    {
      id: 14,
      name: 'Dennis Schulist',
      email: 'elliott@linwood.tv',
      role: 'FULL STACK DEVELOPER',
    },
    {
      id: 15,
      name: 'Mariana Dach',
      email: 'dorothea@mcdermott.info',
      role: 'DB ADMIN',
    },
    {
      id: 16,
      name: 'Samantha Ratke',
      email: 'cooper_waters@reymundo.org',
      role: 'FINANCIAL ANALYST',
    },
    {
      id: 17,
      name: 'Mittie Wintheiser',
      email: 'rosemarie@vincenzo.tv',
      role: 'CONTENT STRATEGIST',
    },
    {
      id: 18,
      name: 'Laurie Rutherford',
      email: 'abner@jasper.info',
      role: 'NETWORK ENGINEER',
    },
    {
      id: 19,
      name: 'Winona Price',
      email: 'brandyn@lurline.tv',
      role: 'HR SPECIALIST',
    },
    {
      id: 20,
      name: 'Eliseo Harris',
      email: 'adalberto@cordell.biz',
      role: 'SOFTWARE ENGINEER',
    },
  ];

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role == role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => (user.id = id));
    return user;
  }

  //   create user
  create(user: userProps) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  //    update user
  update(id: number, updatedUser: updateUserProps) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  //   delete user
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}

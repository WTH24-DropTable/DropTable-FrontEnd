# AttendanceGO! 
![AttendanceGO! Banner](https://github.com/user-attachments/assets/080ec3e7-98e5-4d0d-bfab-647f6574c36c)

[**AttendanceGO!**](https://devpost.com/software/attendancego) uses Computer Vision to perform Facial Recognition to streamline the attendance taking process. Lecturers simply have to mount their mobile devices on a stand and position it near the door of the classroom. As students walk in, their faces are recognised by our system, and their attendance is automatically marked. Attendance can be marked as either 'present' or 'late', depending on the configuration set by the lecturer.

The onboarding process is really simple. The school's admin will create user accounts for all students by uploading a .csv file containing some of their information. When the student first logs into their account, they will be prompted to take a Profile Picture. This profile picture is then used to train our Facial Recognition model to assist in the attendance taking process. As little as ONE photo is required, making it super simple for them.

When uploading a Medical Certificate (MC), information from the MC, such as the MC's NRIC, start date, duration, and more are automatically extracted, streamlining the MC approval process for the school's admin.

## How we built it
AttendanceGO! is built using Next.JS (TypeScript) and TailwindCSS for our Front-End, with ExpressJS and NodeJS for our Back-End. Firebase (Cloud Firestore, Cloud Storage) powers our database. OpenAI's GPT-4o-Mini model is used to extract information from Medical Certificates, and our Facial Recognition was powered by Tensorflow and Face-API.  
Back-End Repository: https://github.com/WTH24-DropTable/DropTable-BackEnd

## What's Next?
Continue improving our various features, including but not limited to:
1. Automating Medical Certificate approval through the use of AI
2. Expanding our use-cases to target companies

## App Showcase
### Home Screen (Students)
![photo_2024-12-22_12-55-36](https://github.com/user-attachments/assets/22dd5269-f4b3-4067-8527-30f022b9c04a)
### Facial Recognition Attendance Taking (Teacher)
![photo_4_2024-12-22_12-54-49](https://github.com/user-attachments/assets/0bf85e33-0f54-4a35-bed7-53368aaee9ef)
### Create Class (Teacher)
![photo_2_2024-12-22_12-54-49](https://github.com/user-attachments/assets/469acf38-b0c5-4371-a7fb-ef1742339555)
### Class Management (Teacher)
![photo_3_2024-12-22_12-54-49](https://github.com/user-attachments/assets/4c5152d0-3d0a-42a0-973c-263ce647141a)
### Medical Certificate Approval (School Administrator)
![photo_2024-12-22_13-00-19](https://github.com/user-attachments/assets/553fc393-db12-4a9e-9730-fa20b68d0183)
### Upload Master Sheet of Students (School Administrator)
![photo_6_2024-12-22_12-54-49](https://github.com/user-attachments/assets/fdfdc791-7299-44a5-b34c-306ce6d3354f)

###### Created by Ethan Chew, Emmanuel Rafol, Jerick Seng, Hervin Sie, Alfred Kang as part of What The Hack 2024

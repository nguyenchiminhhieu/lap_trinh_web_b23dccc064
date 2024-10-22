from fastapi import FastAPI, Response, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
import sqlite3

# Khởi tạo app FastAPI
app = FastAPI()

# Khai báo danh sách các origin được phép
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5500",
]

# Thiết lập CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kết nối đến cơ sở dữ liệu SQLite
DATABASE_URL = "sqlite:///./test.db"

# Tạo engine và session với SQLite
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Đường dẫn /save_userName trong FastAPI để lưu thông tin vào database.
@app.post("/save_userName")
async def save_userName(request: Request, bodyreq: dict):
    try:
        con = sqlite3.connect("test.db")
        cursor = con.cursor()
        
        print("bodyreq: ", bodyreq)
        maSv = bodyreq.get('maSv')
        name = bodyreq.get('fullName')
        lopHanhChinh = bodyreq.get('lopHanhChinh')
        email = bodyreq.get('email')
        soDt = bodyreq.get('soDt')
        diaChi = bodyreq.get('diaChi')
        gioiTinh = bodyreq.get('gioiTinh')
        note = bodyreq.get('note')
        print(maSv, name, lopHanhChinh, email, soDt, diaChi, gioiTinh, note) 
        
        # Thực thi câu lệnh Insert sử dụng cursor với dữ liệu đã lấy được
        cursor.execute("INSERT INTO sinhvien VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                       (maSv, name, lopHanhChinh, soDt, email, diaChi, gioiTinh, note))
        con.commit()
        
        cursor.close()
        con.close()

        return {"message": "Username saved successfully"}
    except Exception as e:
        return {"error": str(e)}

# Đường dẫn / trong FastAPI để lấy thông tin từ database.
@app.get("/")
async def index(db: Session = Depends(get_db)):
    con = sqlite3.connect("test.db")
    cursor = con.cursor()
    cursor.execute("SELECT * FROM users")
    result = cursor.fetchall()
    cursor.close()
    con.close()
    print('hello')
    
    return {'data': result}

@app.get("/getStudents")
async def index(db: Session = Depends(get_db)):
    con = sqlite3.connect("test.db")
    cursor = con.cursor()
    cursor.execute("SELECT * FROM sinhvien")
    result = cursor.fetchall()
    cursor.close()
    con.close()
    print("hello")
    return {'data': result}

@app.delete("/deleteStudent/{maSv}")
async def deleteStudent(maSv: str, db: Session = Depends(get_db)):
    con = sqlite3.connect("test.db")
    cursor = con.cursor()
    print(maSv + " da thuc hien")
    print(maSv)
    try:
        cursor.execute("DELETE FROM sinhvien WHERE maSv = ?", (maSv,))
        con.commit()
    except Exception as e:
        con.rollback()
    finally:
        cursor.close()
        con.close()

@app.post("/changeStudent")
async def changeStudent(request: Request, bodyreq: dict):
    try:
        con = sqlite3.connect("test.db")
        cursor = con.cursor()
       
        print("bodyreq: ", bodyreq)
        maSv = bodyreq.get('maSv')
        name = bodyreq.get('fullName')
        lopHanhChinh = bodyreq.get('lopHanhChinh')
        email = bodyreq.get('email')
        soDt = bodyreq.get('soDt')
        diaChi = bodyreq.get('diaChi')
        gioiTinh = bodyreq.get('gioiTinh')
        note = bodyreq.get('note')
        print(maSv, name, lopHanhChinh, email, soDt, diaChi, gioiTinh, note)
        
        cursor.execute("""
            UPDATE sinhvien 
            SET hoTen = ?, lopHanhChinh = ?, soDt = ?, email = ?, diaChi = ?, gioiTinh = ?, ghiChu = ? 
            WHERE maSv = ?
        """, (name, lopHanhChinh, soDt, email, diaChi, gioiTinh, note, maSv))
        con.commit()
        
        cursor.close()
        con.close()

        return {"message": "Username saved successfully"}
    except Exception as e:
        return {"error": str(e)}

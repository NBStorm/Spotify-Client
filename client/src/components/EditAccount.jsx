import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const EditAccount = () => {

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('access');  // Lấy token từ localStorage
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    // setUserId(decodedToken.id);
    console.log(decodedToken.email);
    const [formData, setFormData] = useState({
        username: decodedToken.username,
        email: decodedToken.email,
        currentPassword: '',
        newPassword: '',
        shareData: true,
    });

    useEffect(() => {
        if (token) {
            try {
                setUserId(decodedToken.id);
            } catch (err) {
                console.error('Token không hợp lệ hoặc không thể giải mã:', err);
                alert('Lỗi khi giải mã token.');
            }
        } else {
            alert('Token không tồn tại!');
            navigate('/login');
        }
    }, [token, navigate]);

    // Hàm xử lý thay đổi thông tin trong form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    //===============================Chưa xong================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!formData.currentPassword) {
        //     alert("Bạn phải nhập mật khẩu hiện tại để cập nhật hồ sơ.");
        //     return;
        // }

        const updateData = {
            username: formData.username,
            email: formData.email,
            password: formData.currentPassword,
            // new_password: formData.newPassword,

        };
        console.log(updateData)

        try {
            await axios.put(`http://127.0.0.1:8000/api/users/${userId}/`, updateData, {
                headers: { Authorization: `Bearer ${token}` },
            });


            const loginResponse = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.currentPassword,
                }),
            });

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                throw new Error(loginData.detail || "Đăng nhập lại sau khi cập nhật thất bại");
            }

            localStorage.setItem("access", loginData.access);
            localStorage.setItem("refresh", loginData.refresh);

            alert("Cập nhật thành công!");
            navigate('/');
        } catch (err) {
            console.error('Cập nhật thất bại:', err);
            alert("Cập nhật thất bại. Vui lòng kiểm tra mật khẩu hiện tại.");
        }

        //===============================Chưa xong================================
    };






    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-start pt-12">
            <div className="w-full max-w-2xl px-6">
                <Link to="/">
                    <button className="text-white text-xl mb-4">←</button>
                </Link>

                <h1 className="text-3xl font-bold mb-6">Chỉnh sửa hồ sơ</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm mb-1">Tên người dùng</label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-neutral-900 text-white rounded border border-neutral-700"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-neutral-900 text-white rounded border border-neutral-700"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Mật khẩu mới</label>
                        <input
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-neutral-900 text-white rounded border border-neutral-700"
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm mb-1">Mật khẩu mới</label>
                        <input
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-neutral-900 text-white rounded border border-neutral-700"
                        />
                    </div> */}

                    <div className="flex items-center">
                        <input
                            name="shareData"
                            type="checkbox"
                            checked={formData.shareData}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-sm">
                            Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung Spotify cho mục đích tiếp thị.
                        </label>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button type="button" className="text-white" onClick={() => navigate(-1)}>
                            Hủy
                        </button>
                        <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded-full font-bold">
                            Lưu hồ sơ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccount;

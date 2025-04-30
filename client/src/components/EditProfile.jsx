import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        shareData: true,
    });

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('access');  // Lấy token từ localStorage

    // useEffect(() => {
    //     // Nếu có token thì mới tiến hành lấy thông tin người dùng
    //     if (token) {
    //         try {
    //             // Giải mã token JWT để lấy userId
    //             const decodedToken = jwtDecode(token);
    //             setUserId(decodedToken.id);

    //             // console.log(decodedToken)


    //             // Fetch user info sau khi giải mã được token
    //             const fetchUser = async () => {
    //                 try {
    //                     const response = await fetch(`http://127.0.0.1:8000/api/users/${decodedToken.id}`, {
    //                         method: 'GET',

    //                     });

    //                     if (!response.ok) {
    //                         throw new Error('Failed to fetch user data');
    //                     }

    //                     const user = await response.json();

    //                     // Cập nhật formData với thông tin người dùng
    //                     setFormData((prev) => ({
    //                         ...prev,
    //                         username: user.username || '',
    //                         email: user.email || '',
    //                         shareData: user.shareData || true,
    //                     }));
    //                 } catch (err) {
    //                     console.error('Failed to fetch user:', err);
    //                     alert("Không thể tải thông tin người dùng.");
    //                 }
    //             };

    //             fetchUser();
    //         } catch (err) {
    //             console.error('Token không hợp lệ hoặc không thể giải mã:', err);
    //             alert('Lỗi khi giải mã token.');
    //         }
    //     } else {
    //         alert('Token không tồn tại!');
    //         navigate('/login'); // Nếu không có token, chuyển đến trang đăng nhập
    //     }
    // }, [token, navigate]);

    // Hàm xử lý thay đổi thông tin trong form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Hàm gửi dữ liệu khi người dùng nhấn nút "Lưu hồ sơ"
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateData = {
            username: formData.username,
            email: formData.email,
            ...(formData.newPassword && { password: formData.newPassword }), // Nếu có mật khẩu mới thì gửi mật khẩu mới
            shareData: formData.shareData,
        };

        try {
            // Gửi PUT request để cập nhật thông tin người dùng
            await axios.put(`/api/users/${userId}/`, updateData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Cập nhật thành công!");
            navigate('/'); // Quay lại trang chủ sau khi cập nhật
        } catch (err) {
            console.error('Cập nhật thất bại:', err);
            alert("Cập nhật thất bại. Vui lòng thử lại.");
        }
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
                        <label className="block text-sm mb-1">Mật khẩu hiện tại</label>
                        <input
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-neutral-900 text-white rounded border border-neutral-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Mật khẩu mới</label>
                        <input
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-neutral-900 text-white rounded border border-neutral-700"
                        />
                    </div>

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

export default EditProfile;

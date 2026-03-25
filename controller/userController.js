import users from "../config/db.js";

let currentId = users.length + 1;

// ✅ GET ALL USERS
export const getUsers = async (req, res) => {
  const { search, sort = "id", order = "asc" } = req.query;

  try {
    let filtered = [...users];

    // 🔍 Search
    if (search) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🔄 Sort
    filtered.sort((a, b) => {
      let valA = a[sort];
      let valB = b[sort];

      if (typeof valA === "string") {
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return order === "asc" ? valA - valB : valB - valA;
    });

    res.json({ success: true, users: filtered });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};



// ✅ GET SINGLE USER
export const getUser = async (req, res) => {
  try {
    const user = users.find((u) => u.id == req.params.id);

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};



// ✅ CREATE USER
export const createUser = async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.json({
      success: false,
      message: "name, email and age required",
    });
  }

  try {
    const newUser = {
      id: currentId++,
      name,
      email,
      age,
    };

    users.push(newUser);

    res.json({ success: true, newUser });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};



// ✅ UPDATE USER
export const updateUser = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const index = users.findIndex((u) => u.id == req.params.id);

    if (index === -1) {
      return res.json({ success: false, message: "user not found" });
    }

    users[index] = {
      ...users[index],
      name: name || users[index].name,
      email: email || users[index].email,
      age: age || users[index].age,
    };

    res.json({ success: true, updatedUser: users[index] });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};



// ✅ DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const index = users.findIndex((u) => u.id == req.params.id);

    if (index === -1) {
      return res.json({ success: false, message: "user not found" });
    }

    users.splice(index, 1);

    res.json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
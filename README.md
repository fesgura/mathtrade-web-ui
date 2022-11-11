This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Personal

## My Collection

**GET**

<code>api/items/</code>

**DELETE**

<code>api/items/{id}</code>

---

# Mathtrade

### Get Mathtrades

> GET

<code>api/mathtrades/</code>

---

# 1. MIS ITEMS

## My Item list

> GET

<code>api/mathtrades/{id}/user-items/</code>

> POST (publish item)

<code>api/mathtrades/{id}/user-items/</code>

<pre>
{
  item_id: "",
}
</pre>

> DELETE (unpublish item)

<code>api/mathtrades/{id}/user-items/{id}/</code>

## My Groups

> GET

<code>api/item-groups/</code>

> POST (create)

<code>api/item-groups/</code>

<pre>
{
    "name": "",
    "color": null,
    "item_ids": []
}
</pre>

> PUT (edit)

<code>api/item-groups/{id}/</code>

<pre>
{
    "name": "",
    "thumbnail": "",
    "item_ids": []
}
</pre>

> DELETE

<code>api/item-groups/{id}/</code>

---

## 2. LIST

## Item List

> GET

<code>api/mathtrades/{id}/items/</code>

## Game List

> GET

<code>api/mathtrades/{id}/games/</code>

## Post Items Values

> POST

<code>api/mathtrades/{id}/items/item-values/</code>

<pre>
{
  "value": "",
  "item_ids": []
}
</pre>

## Item Groups

> GET

<code>api/mathtrades/{id}/user-item-groups/</code>

> POST (create)

<code>api/mathtrades/{id}/user-item-groups/</code>

<pre>
{
    "name": "",
    "thumbnail": "",
    "item_ids": []
}
</pre>

> PUT (edit)

<code>api/mathtrades/{id}/user-item-groups/{id}/</code>

<pre>
{
    "name": "",
    "thumbnail": "",
    "item_ids": []
}
</pre>

> DELETE

<code>api/mathtrades/{id}/user-item-groups/{id}/</code>

---

## 3. WANT LIST

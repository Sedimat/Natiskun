import datetime
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm
from .models import UserProfile, UserList, Messeg
from django.db.models import Q
import random
import string
import re
import json


def extract_image_links(text):
    # Регулярний вираз для виявлення посилань на зображення
    image_pattern = re.compile(r'https?://\S+?\.(?:png|jpg|jpeg|gif|bmp)', re.IGNORECASE)

    # Знаходимо всі посилання на зображення в тексті
    image_links = re.findall(image_pattern, text)
    text_without_images = re.sub(image_pattern, '', text)

    # Знаходимо всі посилання  в тексті та відокремлює текст окремо
    link_pattern = re.compile(r'https?://[^\s]+')
    links = re.findall(link_pattern, text_without_images)
    text_without_links = re.sub(link_pattern, '', text_without_images)


    return [text_without_links, image_links, links]



def list_contact(user, x=None):
    list_contact = UserList.objects.filter(id_user=user)
    list_cont = []
    list_meseg_new = []
    for cont in list_contact:
        len_m = 0
        user_p = UserProfile.objects.get(id_user=cont.list_user)
        user_p1 = UserProfile.objects.get(id_user=user.id)
        user_n = User.objects.get(username=cont.list_user)
        key = ""
        if user.id < user_n.id:
            key = f"{user_p1.key}{user_p.key}"
        else:
            key = f"{user_p.key}{user_p1.key}"

        if x == 1:
            messegs = Messeg.objects.filter(key=key, user_2="", user_1=user_n.username).order_by("-timestamp")  # сортує по даті додавання
            list_meseg_new.append([user_n.username,len(messegs)])


        else:
            messegs = Messeg.objects.filter(key=key).order_by("-timestamp")  # сортує по даті додавання
            for m in messegs:
                if user.username != m.user_1 and m.user_2 == "":
                    len_m += 1

            if messegs:
                list_cont.append([str(user_p.avatar), user_n.username, messegs[0].messeg_1, len_m, f"/contact/{user_n.username}"])
            else:
                list_cont.append([str(user_p.avatar), user_n.username, "", len_m , f"/contact/{user_n.username}"])

    if x == 1:
        return {"list_meseg_new": list_meseg_new}

    else:
        return {"list_cont": list_cont}

def list_messeg(user, name, x=0, len=10, add=0):
    print(add)
    user_p = UserProfile.objects.get(id_user=user)
    user1 = User.objects.get(username=name)
    user_p1 = UserProfile.objects.get(id_user=user1)
    key = ""
    if user.id < user1.id:
        key = f"{user_p.key}{user_p1.key}"
    else:
        key = f"{user_p1.key}{user_p.key}"
    if add == 0:
        messegs = Messeg.objects.filter(key=key).order_by("-timestamp")[:len]  # сортує по даті додавання та видає обмежену кількість
    else:
        messegs = Messeg.objects.filter(key=key).order_by("-timestamp")[add:add+10]
    if x == 0:
        return {"messegs": messegs}
    else:
        list_messeg = []
        id_list = []
        for m in messegs:
            img_list = json.loads(m.messeg_2)
            link_list = json.loads(m.messeg_3)
            if m.user_2 == "1":
                list_messeg.append([[m.user_1, m.messeg_1, m.timestamp.strftime("%H:%M")+" ✅"], img_list, link_list])
            else:
                list_messeg.append([[m.user_1, m.messeg_1, m.timestamp.strftime("%H:%M") + " ✉"], img_list, link_list])

            if user.username != m.user_1:
                id_list.append(m.id)

        # Змінюємо статус на прочитані
        Messeg.objects.filter(id__in=id_list).update(user_2=1)

        return {"messegs": list_messeg}


def contact_list(user):
    list_contact = UserList.objects.filter(id_user=user)
    list_cont = []
    for cont in list_contact:
        user_p = UserProfile.objects.get(id_user=cont.list_user)
        user_n = User.objects.get(username=cont.list_user)
        list_cont.append([user_p.avatar, user_n.username, ""])

    return {"list_cont": list_cont}


def generate_random_string():
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(8))

def U_Prof(request):
    try:
        user = User.objects.get(username=request.user.username)
        user_prof = UserProfile.objects.get(id_user=user)
        return {"user_prof": user_prof}
    except:
        return {"a": 0}


def index(request):
    # query = request.POST.get('query')
    # post = Post.objects.filter(Q(title__icontains=query) | Q(content__icontains=query)).order_by("-published_date")  # сортує по даті додавання


    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))

    if request.method == "POST":
        search = request.POST.get('search')
        if search:
            list_user = User.objects.filter(username__icontains=search)
            context.update({"list_user": list_user})

        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            user = user_form.save()
            login(request, user)
            profile = UserProfile(id_user=user, avatar='avatar/1234.jpg', phone=' ', key=generate_random_string())
            profile.save()
        else:
            # Якщо форма не валідна, отримайте доступ до помилок
            errors = user_form.errors

    return render(request, 'Natiskun/index.html', context=context)

def logout_view(request):
    logout(request)
    return redirect('index')


def search(request, id=None):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))
        context.update(contact_list(user))  # отримуемо список контактів


    else:
        return redirect('index')

    if id == 1:
        list_user = User.objects.all()
        double_list_user = []
        for i in list_user:
            user_p = UserProfile.objects.get(id_user=i.id)
            double_list_user.append([i.username, user_p.avatar, i.id])

        context.update({"list_user": double_list_user})

    if request.method == "POST":
        search = request.POST.get('search')
        if search:
            list_user = User.objects.filter(username__icontains=search)
            double_list_user = []
            for i in list_user:
                user_p = UserProfile.objects.get(id_user=i.id)
                double_list_user.append([i.username, user_p.avatar, i.id])

            context.update({"list_user": double_list_user})

    return render(request, 'Natiskun/search.html', context=context)


def add(request, id=None):
    user = User.objects.get(username=request.user.username)
    user_contact = User.objects.get(id=id)

    user_list = UserList.objects.filter(id_user=user)
    list_name = []
    user_list1 = UserList.objects.filter(id_user=user_contact)
    list_name1 = []
    for us in user_list1:
        list_name1.append(str(us.list_user))
    for us in user_list:
        list_name.append(str(us.list_user))
    if user_contact.username not in list_name:
        u_list = UserList(id_user=user, list_user=user_contact, status=1)
        u_list.save()
    if user.username not in list_name1:
        u_list1 = UserList(id_user=user_contact, list_user=user, status=1)
        u_list1.save()
    return redirect('index')


def contact(request, name=None):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))
        context.update({"name": name})
    else:
        return redirect('index')

    # if request.method == "POST":
    #     messeg = request.POST.get('messeg')
    #     if messeg:
    #         # Закодовуєм список з посиланнями на зображення та просто посилання
    #         list_mess = extract_image_links(messeg)
    #         json_list_mess = json.dumps(list_mess[1])
    #         json_list_link = json.dumps(list_mess[2])
    #
    #         user = User.objects.get(username=request.user.username)
    #         user_p = UserProfile.objects.get(id_user=user)
    #         user1 = User.objects.get(username=name)
    #         user_p1 = UserProfile.objects.get(id_user=user1)
    #
    #         key = ""
    #         if user.id < user1.id:
    #             key = f"{user_p.key}{user_p1.key}"
    #         else:
    #             key = f"{user_p1.key}{user_p.key}"
    #
    #         mess = Messeg(key=key, user_1=user.username, messeg_1=list_mess[0],
    #                       messeg_2=json_list_mess, messeg_3=json_list_link)
    #         mess.save()


    return render(request, 'Natiskun/contact.html', context=context)

# Виводе перші N повідомлень
def get_data(request, name=None, id=None):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        if id == 0:
            context.update({"username": user.username})
            context.update(list_messeg(user, name,1))
            context.update(list_contact(user))
        else:
            context.update({"username": user.username})
            context.update(list_messeg(user, name, 1,add=id))

    return JsonResponse(context)

# додає N повідомлень
def get_data0(request, name=None, id=None):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update(list_messeg(user, name, 1, id))
    return JsonResponse(context)



def index_js(request):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update(list_contact(user))
    return JsonResponse(context)

def new_mess_js(request):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update(list_contact(user, x=1))
    return JsonResponse(context)


def post_mess(request):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"username": user.username})

    if request.method == "POST":
        messeg = request.POST.get('messeg')
        name = request.POST.get('name')
        if messeg:
            # Закодовуєм список з посиланнями на зображення та просто посилання
            list_mess = extract_image_links(messeg)
            json_list_mess = json.dumps(list_mess[1])
            json_list_link = json.dumps(list_mess[2])

            user = User.objects.get(username=request.user.username)
            user_p = UserProfile.objects.get(id_user=user)
            user1 = User.objects.get(username=name)
            user_p1 = UserProfile.objects.get(id_user=user1)

            key = ""
            if user.id < user1.id:
                key = f"{user_p.key}{user_p1.key}"
            else:
                key = f"{user_p1.key}{user_p.key}"

            mess = Messeg(key=key, user_1=user.username, messeg_1=list_mess[0],
                          messeg_2=json_list_mess, messeg_3=json_list_link)
            mess.save()
            context.update(list_messeg(user, name, 1, 1))

    return JsonResponse(context)


def user(request):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))

    return render(request, 'Natiskun/user.html', context=context)
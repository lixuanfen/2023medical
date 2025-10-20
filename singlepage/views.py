from django.shortcuts import render

def single_page(request):
    """单页面应用视图"""
    return render(request, 'singlepage/index.html')
